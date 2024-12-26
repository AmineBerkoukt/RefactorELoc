import mongoose from 'mongoose'; // Add this import statement
import Post from '../models/Post.js';


export const createPost = async (req, res) => {
    const userId = req.user.id; //getting it from the auth middleware

    try {
        const {
            title,
            description,
            price,
            address,
            elevator,
            maximumCapacity,
            avgRate
        } = req.body;

        const images = req.files ? req.files.map((file) => `/uploads/images/${file.filename}`) : [];


        // Create a new post
        const newPost = new Post({
            userId,
            title,
            description,
            images,
            price,
            address,
            elevator,
            maximumCapacity,
            likesCount:0,
            avgRate
        });

        // Save the post to the database
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({message: 'Failed to create post', error: error.message});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        // Aggregate to calculate the avgRate
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails' // Unwind the userDetails array to access its fields
            },
            {
                $project: {
                    // Post fields you want to keep (add or remove as needed)
                    title: 1,               // Include post title
                    description: 1,         // Include post description
                    images: 1,              // Include images
                    price: 1,               // Include price
                    address: 1,             // Include address
                    elevator: 1,            // Include elevator info
                    maximumCapacity: 1,     // Include maximumCapacity
                    likesCount: 1,
                    avgRate: 1,
                    // Specific user fields
                    'user.id' : '$userDetails._id',
                    'user.phoneNumber': '$userDetails.phoneNumber',
                    'user.firstName': '$userDetails.firstName',
                    'user.lastName': '$userDetails.lastName'
                }
            }
        ]);

        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch posts', error: error.message});
    }
};


export const getAllPostsPaginated = async (req, res) => {
    try {
        const postPerPage = 10;
        const {page} = req.query;

        // Aggregate to calculate the avgRate
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails' // Unwind the userDetails array to access its fields
            },
            {
                $project: {
                    // Post fields you want to keep (add or remove as needed)
                    title: 1,               // Include post title
                    description: 1,         // Include post description
                    images: 1,              // Include images
                    price: 1,               // Include price
                    address: 1,             // Include address
                    elevator: 1,            // Include elevator info
                    maximumCapacity: 1,     // Include maximumCapacity
                    likesCount: 1,
                    avgRate: 1,
                    // Specific user fields
                    'user.id' : '$userDetails._id',
                    'user.phoneNumber': '$userDetails.phoneNumber',
                    'user.firstName': '$userDetails.firstName',
                    'user.lastName': '$userDetails.lastName'
                }
            },
            {
                $project: {
                    ratings: 0,
                },
            },
        ])
            .skip((page - 1) * postPerPage)
            .limit(postPerPage);

        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch posts', error: error.message});
    }
};

export const getPostById = async (req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails' // Unwind the userDetails array to access its fields
            },
            {
                $project: {
                    // Post fields you want to keep (add or remove as needed)
                    title: 1,               // Include post title
                    description: 1,         // Include post description
                    images: 1,              // Include images
                    price: 1,               // Include price
                    address: 1,             // Include address
                    elevator: 1,            // Include elevator info
                    maximumCapacity: 1,     // Include maximumCapacity
                    likesCount: 1,
                    avgRate: 1,
                    // Specific user fields
                    'user.id' : '$userDetails._id',
                    'user.phoneNumber': '$userDetails.phoneNumber',
                    'user.firstName': '$userDetails.firstName',
                    'user.lastName': '$userDetails.lastName'
                }
            },
            {
                $project: {
                    ratings: 0,
                },
            },
        ]);

        if (post.length === 0) {
            return res.status(404).json({message: 'Post not found'});
        }

        return res.status(200).json(post[0]);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch post', error: error.message});
    }
};


export const getTopRatedPosts = async (req, res) => {
    try {
        const topRatedPosts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails' // Unwind the userDetails array to access its fields
            },
            {
                $project: {
                    // Post fields you want to keep (add or remove as needed)
                    title: 1,               // Include post title
                    description: 1,         // Include post description
                    images: 1,              // Include images
                    price: 1,               // Include price
                    address: 1,             // Include address
                    elevator: 1,            // Include elevator info
                    maximumCapacity: 1,     // Include maximumCapacity
                    avgRate: 1,
                    // Specific user fields
                    'user.id' : '$userDetails._id',
                    'user.phoneNumber': '$userDetails.phoneNumber',
                    'user.firstName': '$userDetails.firstName',
                    'user.lastName': '$userDetails.lastName'
                }
            },
            {
                $sort: {avgRate: -1},
            },
            {
                $limit: 5,
            }
        ]);

        res.status(200).json({
            posts: topRatedPosts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in postController. Failed to fetch top-rated posts',
            error: error.message,
        });
    }
};

export const likePost = async (req, res) => {
    try {
        const {id} = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {$inc: {likesCount: 1}}, // Use $inc to increment the likesCount
            {new: true} // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({message: 'Post not found'});
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({message: 'Failed to update post', error: error.message});
    }
};

export const updatePost = async (req, res) => {
    try {
        const {id} = req.params;

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedPost) {
            return res.status(404).json({message: 'Post not found'});
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({message: 'Failed to update post', error: error.message});
    }
};


export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({message: 'Post not found'});
        }

        return res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to delete post', error: error.message});
    }
};
