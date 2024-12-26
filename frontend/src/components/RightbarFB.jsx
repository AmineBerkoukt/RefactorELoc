import React from 'react';
import SearchUser from "./SearchUser.jsx";

function RightbarFb() {
    return (
        <>
            <SearchUser/>
            <aside className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-fit">
                <h2 className="font-semibold text-lg mb-4 dark:text-gray-200">Right Sidebar</h2>
                <p className="text-sm dark:text-gray-400">
                    Add any additional content or widgets here, such as friends, ads, or trending topics.
                </p>
            </aside>
        </>
    );
}

export default RightbarFb;