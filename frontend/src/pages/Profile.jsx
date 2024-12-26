import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';

const Profile = () => {
    const user = {
        name: 'John Doe',
        avatar: '/avatar-1.png',
        coverPhoto: '/cover-photo.jpg',
        bio: 'Software developer | Coffee enthusiast | Travel lover'
    };

    const posts = [
        {
            id: 1,
            user: { name: user.name, avatar: user.avatar },
            content: 'Working on an exciting new project!',
            timestamp: '1 day ago'
        },
        {
            id: 2,
            user: { name: user.name, avatar: user.avatar },
            content: 'Just got back from an amazing vacation!',
            image: '/vacation-photo.jpg',
            timestamp: '1 week ago'
        },
        // Add more posts as needed
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
                    <img src={user.coverPhoto} alt="Cover" className="w-full h-64 object-cover rounded-t-lg" />
                    <div className="p-4 flex items-end -mt-16">
                        <img src={user.avatar} alt={user.name} className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mr-4" />
                        <div>
                            <h1 className="text-3xl font-bold dark:text-gray-200">{user.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">Posts</h2>
                    {posts.map(post => (
                        <Post key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

