
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AddTaskModal } from './components/AddTaskModal';
import { TaskList } from './components/TaskList';
import { UserSwitch } from './components/UserSwitch';
import { CustomerHistoryModal } from './components/CustomerHistoryModal';
import { UserRole, Task, Technician, NotificationMessage, TaskStatus, ServiceRecord } from './types';
import { INITIAL_TECHNICIANS, USER_ROLES_CONFIG, PlusCircleIcon as PlusIcon, APP_TITLE, XCircleIcon } from './constants';

const BELL_SOUND_PATH = '/assets/bell.mp3'; 

const playSound = (soundPath: string) => {
  try {
    const audio = new Audio(soundPath);
    audio.play().catch(error => console.warn("Audio play failed:", error));
  } catch (error) {
    console.warn("Failed to play sound:", error);
  }
};

interface AlertMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; id: string; name: string }>({
    role: UserRole.MANAGER,
    id: USER_ROLES_CONFIG.MANAGER.id,
    name: USER_ROLES_CONFIG.MANAGER.name,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [serviceHistory, setServiceHistory] = useState<ServiceRecord[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [alertMessages, setAlertMessages] = useState<AlertMessage[]>([]);
  const technicians: Technician[] = INITIAL_TECHNICIANS;

  const addAlert = (text: string, type: 'success' | 'error') => {
    const id = Date.now();
    setAlertMessages(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setAlertMessages(prev => prev.filter(msg => msg.id !== id));
    }, type === 'success' ? 20000 : 7000); // Increased success message duration to 20s
  };

  const removeAlert = (id: number) => {
    setAlertMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const addNotification = useCallback((message: string, recipientId: string, relatedTaskId?: string) => {
    setNotifications(prev => [
      { id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, message, timestamp: new Date(), read: false, recipientId, relatedTaskId },
      ...prev
    ]);
  }, []);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'status' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    if (newTask.assignedTechnicianId && newTask.assignedTechnicianName) {
      addNotification(
        `New task: "${newTask.description.substring(0,20)}..." for ${newTask.applianceType} (Customer: ${newTask.customerName.split(' ')[0]}) assigned to you.`, 
        newTask.assignedTechnicianId,
        newTask.id
      );
    }
    
    addNotification(
        `Task for ${newTask.applianceType} (Customer: ${newTask.customerName}) assigned to ${newTask.assignedTechnicianName || 'Unassigned'}.`,
        USER_ROLES_CONFIG.MANAGER.id,
        newTask.id
    );
    
    setIsAddTaskModalOpen(false);
    playSound(BELL_SOUND_PATH);
  };

  const handleAcceptTask = (taskId: string) => {
    const taskToAccept = tasks.find(t => 
      t.id === taskId && 
      t.assignedTechnicianId === currentUser.id && 
      t.status === TaskStatus.PENDING
    );

    if (!taskToAccept) {
      console.warn(`[App] handleAcceptTask: Task ${taskId} conditions not met for acceptance by ${currentUser.name}. Task status: ${tasks.find(t => t.id === taskId)?.status}`);
      // Optionally, provide feedback to the user if the task cannot be accepted.
      // addAlert("Cannot accept this task. It might no longer be pending or assigned to you.", "error");
      return;
    }

    const updatedTask: Task = { ...taskToAccept, status: TaskStatus.ACCEPTED };

    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === taskId ? updatedTask : t))
    );

    // Send notifications
    if (updatedTask.assignedTechnicianName) {
         addNotification(
            `Technician ${updatedTask.assignedTechnicianName} ACCEPTED task: "${updatedTask.description.substring(0,20)}..." for ${updatedTask.applianceType}.`,
            USER_ROLES_CONFIG.MANAGER.id,
            taskId
        );
    }
    if (updatedTask.assignedTechnicianId) {
        addNotification(
            `You ACCEPTED task: "${updatedTask.description.substring(0,20)}..." for ${updatedTask.applianceType}.`,
            updatedTask.assignedTechnicianId,
            taskId
        );
    }
    
    playSound(BELL_SOUND_PATH); 

    // Display the specific Somali success message for the technician
    if (currentUser.role === UserRole.TECHNICIAN && currentUser.id === updatedTask.assignedTechnicianId) {
      addAlert(
        "Wad ku mahadsantahay sidaad u aqbashay shaqadaan, fadlan macmiilka aad usocoto ugu adeeg si hufan, daacadnimo, iyo howlkarnimo, mahadsanid!",
        'success'
      );
    }
  };

  const handleRejectTask = (taskId: string) => {
     let rejectedTask: Task | undefined;
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId && task.assignedTechnicianId === currentUser.id && task.status === TaskStatus.PENDING) {
          rejectedTask = { ...task, status: TaskStatus.REJECTED };
          return rejectedTask;
        }
        return task;
      })
    );
    
    if (rejectedTask) {
      const task = rejectedTask as Task; 
      if (task.assignedTechnicianName) {
        addNotification(
            `Technician ${task.assignedTechnicianName} REJECTED task: "${task.description.substring(0,20)}..." for ${task.applianceType}.`,
            USER_ROLES_CONFIG.MANAGER.id,
            taskId
        );
      }
      if (task.assignedTechnicianId) {
        addNotification(
            `You REJECTED task: "${task.description.substring(0,20)}..." for ${task.applianceType}.`,
            task.assignedTechnicianId,
            taskId
        );
      }
    } else {
        console.warn(`[App] handleRejectTask: Task ${taskId} conditions not met for rejection by ${currentUser.name}.`);
    }
  };

  const handleMarkTaskCompleted = (taskId: string) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        console.warn(`[App] handleMarkTaskCompleted: Task with ID ${taskId} not found in current tasks state.`);
        return; 
    }

    const taskToComplete = tasks[taskIndex];

    if (taskToComplete.status === TaskStatus.COMPLETED) {
        console.warn(`[App] handleMarkTaskCompleted: Task with ID ${taskId} is already completed.`);
        return;
    }
     // Ensure only assigned technician or manager can complete
    if (!(currentUser.role === UserRole.MANAGER || (currentUser.role === UserRole.TECHNICIAN && currentUser.id === taskToComplete.assignedTechnicianId))) {
      console.warn(`[App] handleMarkTaskCompleted: User ${currentUser.name} not authorized to complete task ${taskId}.`);
      addAlert("You are not authorized to complete this task.", "error");
      return;
    }
    if (taskToComplete.status !== TaskStatus.ACCEPTED && currentUser.role === UserRole.TECHNICIAN) {
       console.warn(`[App] handleMarkTaskCompleted: Technician ${currentUser.name} cannot complete task ${taskId} as it's not in ACCEPTED state.`);
       addAlert("This task must be in 'ACCEPTED' state before you can complete it.", "error");
       return;
    }


    const completedTaskRecord: Task = {
        ...taskToComplete,
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
    };

    setTasks(prevTasks => prevTasks.map(t => (t.id === taskId ? completedTaskRecord : t)));
    setServiceHistory(prevHistory => [completedTaskRecord, ...prevHistory]);
    
    const completerName = currentUser.role === UserRole.MANAGER ? 'Manager' : (completedTaskRecord.assignedTechnicianName || currentUser.name);
    addNotification(
        `Task for ${completedTaskRecord.customerName} (${completedTaskRecord.applianceType}) marked COMPLETED by ${completerName}.`,
        USER_ROLES_CONFIG.MANAGER.id,
        taskId
    );

    if (completedTaskRecord.assignedTechnicianId) {
        if (completedTaskRecord.assignedTechnicianId === currentUser.id) { // If the tech themselves completed it
            addNotification(
                `You marked task for ${completedTaskRecord.customerName} (${completedTaskRecord.applianceType}) as COMPLETED.`,
                completedTaskRecord.assignedTechnicianId,
                taskId
            );
        } else if (currentUser.role === UserRole.MANAGER) { // If manager completed it for the tech
            addNotification(
                `Task for ${completedTaskRecord.customerName} (${completedTaskRecord.applianceType}) was marked COMPLETED by Manager.`,
                completedTaskRecord.assignedTechnicianId,
                taskId
            );
        }
    }
    
    playSound(BELL_SOUND_PATH);
  };
  
  const handleSwitchUser = (role: UserRole, id: string, name: string) => {
    setCurrentUser({ role, id, name });
    setAlertMessages([]); 
    setNotifications(prev => prev.map(n => (n.recipientId === id && !n.read) ? {...n, read: true} : n));
  };

  const handleClearNotifications = (recipientId: string) => {
    setNotifications(prev => prev.filter(n => n.recipientId !== recipientId));
  };

   useEffect(() => {
    const unreadUserNotifications = notifications.some(n => n.recipientId === currentUser.id && !n.read);
    if (unreadUserNotifications) {
        const timer = setTimeout(() => {
            setNotifications(prev => 
                prev.map(n => (n.recipientId === currentUser.id && !n.read) ? { ...n, read: true } : n)
            );
        }, 3000); 
        return () => clearTimeout(timer);
    }
  }, [notifications, currentUser.id]);


  const visibleTasks = currentUser.role === UserRole.MANAGER 
    ? tasks 
    : tasks.filter(task => task.assignedTechnicianId === currentUser.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 flex flex-col">
      <Header 
        currentUserRole={currentUser.role} 
        currentUserName={currentUser.name}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        currentUserId={currentUser.id}
        onToggleHistoryModal={() => setIsHistoryModalOpen(prev => !prev)}
      />

      {/* Alert Banner Area */}
      <div className="fixed top-20 right-4 z-[200] w-full max-w-md space-y-2"> {/* Increased z-index */}
        {alertMessages.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg shadow-xl text-sm font-medium flex justify-between items-center
              ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            <p>{alert.text}</p>
            <button onClick={() => removeAlert(alert.id)} className="ml-2 p-1 rounded-full hover:bg-black/20">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow mt-8">
        <UserSwitch currentUser={currentUser} onSwitchUser={handleSwitchUser} />

        {currentUser.role === UserRole.MANAGER && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 sm:p-6 rounded-xl shadow-lg mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700">Manager Dashboard</h2>
                <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 w-full sm:w-auto"
                aria-haspopup="true" 
                aria-expanded={isAddTaskModalOpen}
                >
                <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Add New Task
                </button>
            </div>
            <TaskList
              tasks={tasks.filter(task => task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.REJECTED)} 
              currentUserRole={UserRole.MANAGER}
              currentUserId={currentUser.id}
              onCompleteTask={handleMarkTaskCompleted} 
              listTitle="All Active Tasks"
              emptyStateMessage="No active tasks."
            />
          </div>
        )}

        {currentUser.role === UserRole.TECHNICIAN && (
          <div className="bg-sky-50 border-2 border-sky-300 p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-6">Technician Dashboard - {currentUser.name}</h2>
            <TaskList
              tasks={visibleTasks.filter(task => task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.REJECTED)} 
              currentUserRole={UserRole.TECHNICIAN}
              currentUserId={currentUser.id}
              onAcceptTask={handleAcceptTask}
              onRejectTask={handleRejectTask}
              onCompleteTask={handleMarkTaskCompleted} 
              listTitle="Your Assigned Tasks"
              emptyStateMessage="You have no active tasks assigned."
            />
          </div>
        )}
      </main>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        technicians={technicians}
      />
      <CustomerHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={serviceHistory}
        currentUser={currentUser} 
      />
      <footer className="text-center p-4 text-sm text-slate-500 bg-slate-200 border-t border-slate-300">
        &copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};

export default App;