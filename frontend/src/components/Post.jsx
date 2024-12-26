import React from 'react';
import { HandThumbUpIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

const Post = ({ user, content, image, video, timestamp }) => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-4 w-full max-w-6xl mx-auto">
            <div className="flex items-center mb-2">
                <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full mr-2" />
                <div>
                    <h3 className="font-semibold dark:text-gray-200">{user.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{timestamp}</p>
                </div>
            </div>
            <p className="mb-2 dark:text-gray-200">{content}</p>
            {image && <img src={image} alt="Post" className="w-full h-auto object-cover rounded-lg mb-2" />}
            {video && (
                <video controls className="w-full h-auto rounded-lg mb-2">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <div className="flex justify-between items-center border-t dark:border-gray-700 pt-2">
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <HandThumbUpIcon className="h-5 w-5 mr-1" /> Like
                </button>
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <ChatBubbleOvalLeftIcon className="h-5 w-5 mr-1" /> Comment
                </button>
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <ShareIcon className="h-5 w-5 mr-1" /> Share
                </button>
            </div>
        </div>
    );
};

export default Post;

