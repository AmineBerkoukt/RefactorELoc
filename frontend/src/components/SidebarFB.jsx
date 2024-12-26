import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, UsersIcon, BookmarkIcon, CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline';

const SidebarItem = ({ Icon, text, to }) => (
    <Link to={to} className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
        <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        <span className="dark:text-gray-200">{text}</span>
    </Link>
);

const SidebarFB = () => {
    return (
        <div className="w-56 p-4 bg-white dark:bg-gray-800 shadow-lg h-screen border-r border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
                <SidebarItem Icon={UserIcon} text="Profile" to="/profile" />
                <SidebarItem Icon={UsersIcon} text="Friends" to="/friends" />
                <SidebarItem Icon={BookmarkIcon} text="Saved" to="/saved" />
                <SidebarItem Icon={CalendarIcon} text="Events" to="/events" />
                <SidebarItem Icon={NewspaperIcon} text="News" to="/news" />
            </ul>
        </div>
    );
};

export default SidebarFB;

