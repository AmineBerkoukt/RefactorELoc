import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import CreatePost from "../components/CreatePost.jsx";

const Home = () => {
    const posts = [
        {
            id: 1,
            user: { name: 'John Doe', avatar: '/avatar-1.png' },
            content: 'Just had an amazing day at the beach!',
            image: '/beach-post.jpg',
            timestamp: '2 hours ago'
        },
        {
            id: 2,
            user: { name: 'Jane Smith', avatar: '/avatar-2.png' },
            content: 'Check out this cool video I made!',
            video: '/cool-video.mp4',
            timestamp: '4 hours ago'
        },
        {
            id: 2,
            user: { name: 'Jane Smith', avatar: '/avatar-2.png' },
            content: 'Check out this cool video I made!',
            video: '/cool-video.mp4',
            timestamp: '4 hours ago'
        },
        {
            id: 2,
            user: { name: 'Jane Smith', avatar: '/avatar-2.png' },
            content: 'Check out this cool video I made!',
            video: '/cool-video.mp4',
            timestamp: '4 hours ago'
        },
        {
            id: 2,
            user: { name: 'Jane Smith', avatar: '/avatar-2.png' },
            content: 'Check out this cool video I made!',
            video: '/cool-video.mp4',
            timestamp: '4 hours ago'
        },
        // Add more posts as needed
    ];

    return (
        <Layout>
            <div className="flex max-w-3xl mx-auto mt-6 space-x-6">
                {/* Main content */}
                <div className="flex-1">
                    <CreatePost />
                    {posts.map(post => (
                        <Post key={post.id} {...post} />
                    ))}
                </div>


            </div>
        </Layout>
    );
};

export default Home;
