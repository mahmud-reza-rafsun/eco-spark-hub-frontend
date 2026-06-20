import { Dispatch, SetStateAction } from 'react';

export interface SideBarProps {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}