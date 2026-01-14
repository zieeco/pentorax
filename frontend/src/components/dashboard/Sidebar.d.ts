import React from 'react';
interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
