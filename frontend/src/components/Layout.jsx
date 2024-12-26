import React, { useState, useEffect } from 'react';
import NavbarFB from './NavbarFB.jsx';
import SidebarFB from './SidebarFB.jsx';
import RightbarFb from './RightbarFB.jsx';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

const LayoutContent = ({ children }) => {
    const { isDarkMode } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
                <NavbarFB />
                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden lg:block lg:w-64 lg:sticky lg:top-0 lg:h-screen">
                        <SidebarFB />
                    </div>

                    {/* Main content */}
                    <main className="flex-grow p-4">{children}</main>

                    {/* Right Sidebar */}
                    <div className={`hidden lg:block lg:w-64 lg:sticky lg:h-screen lg:mr-4 transition-all duration-300 ease-in-out ${scrolled ? 'lg:top-4' : 'lg:top-0 lg:mt-6'}`}>
                        <RightbarFb />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
    );
};

export default Layout;

