
import React from 'react';
import { Technician, UserRole, ApplianceType } from './types';

export const APP_TITLE = "Somfix Dashboard";

export const USER_ROLES_CONFIG = {
  [UserRole.MANAGER]: { id: UserRole.MANAGER, name: "Manager" },
  [UserRole.TECHNICIAN]: { id: UserRole.TECHNICIAN, name: "Technician" },
};

export const INITIAL_TECHNICIANS: Technician[] = [
  { id: 'tech_default_001', name: 'Default Technician' },
];

// --- START: Random Data Generation ---
const SOMALI_FIRST_NAMES: string[] = ['Ahmed', 'Mohamed', 'Ali', 'Hassan', 'Osman', 'Abdi', 'Fatuma', 'Aisha', 'Maryan', 'Khadija', 'Zahra', 'Amina'];
const SOMALI_LAST_NAMES: string[] = ['Omar', 'Ali', 'Ibrahim', 'Yusuf', 'Hassan', 'Jama', 'Hussein', 'Mohamud', 'Said', 'Nur'];
const SAMPLE_APPLIANCE_ISSUES: Record<ApplianceType, string[]> = {
  [ApplianceType.FRIDGE]: ["Not cooling properly", "Making a loud noise", "Leaking water", "Freezer not working"],
  [ApplianceType.COOKER]: ["One burner not working", "Oven not heating", "Ignition spark problem", "Gas smell detected"],
  [ApplianceType.WASHING_MACHINE]: ["Not spinning", "Drum not filling with water", "Leaking from the bottom", "Error code on display"],
  [ApplianceType.AIR_CONDITIONER]: ["Not blowing cold air", "Water dripping indoors", "Making unusual sounds", "Remote not working"],
  [ApplianceType.OTHER]: ["Device not powering on", "Intermittent functionality", "Physical damage noted", "Needs general inspection"],
};
const GENERIC_TASK_DESCRIPTIONS: string[] = [
    "Customer requested urgent repair service.",
    "Routine diagnostic and repair visit.",
    "Follow-up on previous appliance issue.",
    "New installation and setup verification.",
    "Emergency call-out for non-functional appliance."
];


export const getRandomElement = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const generateRandomSomaliName = (): string => `${getRandomElement(SOMALI_FIRST_NAMES)} ${getRandomElement(SOMALI_LAST_NAMES)}`;

export const generateRandomSomaliPhoneNumber = (): string => {
  const prefix = "+252";
  const mobileCarrierCode = getRandomElement(['61', '62', '63', '65', '68']); // Common mobile prefixes
  const randomNumberPart1 = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  return `${prefix} ${mobileCarrierCode} ${randomNumberPart1.substring(0,3)} ${randomNumberPart1.substring(3,6)}`;
};

export const generateRandomFailureDetails = (appliance: ApplianceType): string => {
    return getRandomElement(SAMPLE_APPLIANCE_ISSUES[appliance] || SAMPLE_APPLIANCE_ISSUES[ApplianceType.OTHER]);
};

export const generateRandomTaskDescription = (): string => getRandomElement(GENERIC_TASK_DESCRIPTIONS);

export const generateRandomAmount = (): number => {
  // Generates an amount between 50 and 300, in increments of 5
  return (Math.floor(Math.random() * ( (300 - 50) / 5 + 1)) + (50 / 5) ) * 5;
};
// --- END: Random Data Generation ---


// SVG Icons - Heroicons
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const WrenchScrewdriverIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.63-6.837 4.655-5.653a2.548 2.548 0 1 0-3.586-3.586l-6.837 5.63" />
</svg>
);


export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 0 1-2.25 2.25h-12a2.25 2.25 0 0 1-2.25-2.25V14.15M16.5 6.75h-9A2.25 2.25 0 0 0 5.25 9v4.5h13.5V9A2.25 2.25 0 0 0 16.5 6.75Z" />
  </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.171m0 0c-.582-.106-1.18-.224-1.79-.348m10.52-1.175L11.25 5.791M4.772 5.791L3.304 3.369m12.182-1.785a1.5 1.5 0 0 0-1.423-.995H9.367a1.5 1.5 0 0 0-1.423.995m10.52 0a48.094 48.094 0 0 0-10.52 0Z" />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className }) => ( // Generic for appliance/issue
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15.045-4.125L5.25 6m13.5 1.875L18.75 6M4.5 12l-.75.625M20.25 12l.75.625M6.75 17.25l-.255-.17M17.25 17.25l.255-.17M12 4.5V3m0 18v-1.5m0-13.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 9.75a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm0-9.75a.75.75 0 0 0-.75-.75V6a.75.75 0 0 0 1.5 0v.75a.75.75 0 0 0-.75-.75Z" />
  </svg>
);

export const ClipboardDocumentListIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0cA3.375 3.375 0 0 1 15 2.25c1.153 0 2.186.304 3.072.811M5.25 6.75A3.375 3.375 0 0 0 2.25 9.75v9.75c0 .933.364 1.767.97 2.402m5.198-.01L11.25 18M3.852 17.842a.75.75 0 0 0-.674.028l-1.548.823a.75.75 0 0 1-.976-.582l-.289-1.447a.75.75 0 0 0-.414-.543l-1.447-.289a.75.75 0 0 1-.582-.976l.823-1.548a.75.75 0 0 0 .028-.674l-.25-.326a.75.75 0 0 1 .504-1.264l1.41-.094a.75.75 0 0 0 .585-.278l1.018-.932a.75.75 0 0 1 .98-.033l1.207.805a.75.75 0 0 0 .932.018l1.505-1.004a.75.75 0 0 1 .908.153l.823.823a.75.75 0 0 0 1.06.106l1.06-1.06a.75.75 0 0 1 1.207.805l-.17.853a.75.75 0 0 0 .38.608l1.207.805a.75.75 0 0 1 .106 1.06l-.823.823a.75.75 0 0 0 .153.908l1.004 1.505a.75.75 0 0 1 .018.932l-.805 1.207a.75.75 0 0 0 .033.98l.932 1.018a.75.75 0 0 0 .278.585l.094 1.41a.75.75 0 0 1-1.264.504l-.326-.25Z" />
  </svg>
);

export const ArchiveBoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.383-.03.768-.032 1.152-.032C12.933 3.876 14.48 4.97 14.48 6.468v5.064M5.25 7.5h13.5m-13.5 0V3.876c0-.34.028-.672.084-1.002A3 3 0 0 1 7.25 1.5h9.5a3 3 0 0 1 2.916 2.374c.056.33.084.662.084 1.002v13.126a3 3 0 0 1-2.916 2.374c-.056.33-.084.662-.084 1.002h-9.5a3 3 0 0 1-2.916-2.374c-.056-.33-.084-.662-.084-1.002V7.5Zm5.25 3.375H8.25m2.25 0H10.5m2.25 0H12.75m2.25 0h-2.25m0 0V12m0 0V10.875m0 0V9.75m5.625-2.625H5.25" />
  </svg>
);

export const CheckBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

export const MagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);