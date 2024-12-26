import React from 'react';
import { Link } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
    BellIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const NavbarFB = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md py-2 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left: Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-90">
                    Facebook
                </Link>

                {/* Center: Search Bar */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search Facebook"
                        className="bg-gray-100 dark:bg-gray-700 py-2 pl-10 pr-3 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 text-sm"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>

                {/* Right: Icons and Actions */}
                <div className="flex items-center space-x-6">
                    {/* Notifications */}
                    <div className="relative group">
                        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>

                    {/* Messages */}
                    <div className="relative group">
                        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>

                    {/* User Avatar */}
                    <img
                        src="/avatar-placeholder.png"
                        alt="User"
                        className="h-8 w-8 rounded-full cursor-pointer hover:opacity-90"
                    />

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 group"
                    >
                        <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        {isDarkMode ? (
                            <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        )}
                        <span className="hidden group-hover:block absolute right-0 mt-8 px-2 py-1 bg-gray-700 text-white text-xs rounded-md shadow-md">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-2 md:hidden flex justify-center">
                <div className="relative w-full px-4">
                    <input
                        type="text"
                        placeholder="Search Facebook"
                        className="bg-gray-100 dark:bg-gray-700 py-2 pl-10 pr-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 text-sm"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-7 top-2.5" />
                </div>
            </div>
        </nav>
    );
};

export default NavbarFB;

