
export enum UserRole {
  MANAGER = 'MANAGER',
  TECHNICIAN = 'TECHNICIAN',
}

export interface Technician {
  id: string;
  name: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export enum ApplianceType {
  FRIDGE = 'Fridge',
  COOKER = 'Cooker',
  WASHING_MACHINE = 'Washing Machine',
  AIR_CONDITIONER = 'Air Conditioner',
  OTHER = 'Other',
}

export interface Task {
  id: string;
  description: string; // General description of the work
  assignedTechnicianId: string | null;
  assignedTechnicianName: string | null;
  status: TaskStatus;
  totalAmountUSD: number;
  createdAt: Date;
  completedAt?: Date; // Optional: track when task was completed
  // New fields
  customerName: string;
  customerPhoneNumber: string;
  applianceType: ApplianceType;
  failureDetails: string; // Specific problem description
}

export interface NotificationMessage {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
  recipientId: string; // 'MANAGER' or Technician ID
  relatedTaskId?: string;
}

// Represents a record in the service history, can be same as Task for now
export type ServiceRecord = Task;