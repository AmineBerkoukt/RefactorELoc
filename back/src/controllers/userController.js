import User from '../models/User.js';
import path from "path";

// Controller to fetch all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Controller to create a new user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        user.role = 'admin';
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Failed to create user" });
    }
};

// Controller to update a user profile
export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, address, phoneNumber, studies } = req.body;

        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé'
            });
        }

        let profilePhotoPath = user.profilePhoto; // Par défaut, garder l'ancienne photo
        if (req.file) {
            //profilePhotoPath = `/uploads/${path.basename(req.file.path)}`;
            profilePhotoPath = `/uploads/${req.user.id}/${path.basename(req.file.path)}`;
//http://localhost:5000//uploads/27-12-2024_01-18-49-Capture.png
        }
// http://localhost:5000//uploads/27-12-2024_01-18-49-Capture.png
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, address, phoneNumber, studies, profilePhoto: profilePhotoPath, },
            { new: true, runValidators: true }
        ).select('-password');


        res.json({
            message: 'Profil mis à jour avec succès',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la mise à jour du profil',
            error: error.message
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // req.user is added by the authenticateToken middleware
        const user = await User.findById(req.user.id)
            .select('-password')
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving profile',
            error: error.message
        });
    }
};

// Controller to search for users by a keyword
export const searchUsers = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword || keyword.trim() === '') {
            return res.status(400).json({ message: "Keyword is required" });
        }

        // Search for users matching the keyword in firstName or lastName
        const users = await User.find({
            $or: [
                { firstName: { $regex: keyword, $options: 'i' } }, // Case-insensitive search
                { lastName: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to search users", error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({message: "no user found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "failed to get user",  error: error.message});
    }
};
