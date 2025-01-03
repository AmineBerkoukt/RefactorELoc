import express from 'express';
import {getUsers, createUser, updateProfile, searchUsers, getCurrentUser, getUserById} from '../controllers/userController.js';
import {authenticateToken} from "../middlewares/authMiddleware.js";
import {validateUpdatingProfile} from "../validations/userValidator.js";
import {restrictTo} from "../middlewares/authMiddleware.js";
import {uploadPfp} from "../config/upload.js";

const router = express.Router();

// Define routes for users
router.get('/', restrictTo("admin"), getUsers);
//Route to add admins not sure to add it in front or not
router.post('/', restrictTo("admin") , createUser);
router.get('/search', searchUsers);


router.put('/update-profile', uploadPfp.single('profilePhoto'), validateUpdatingProfile, updateProfile);
router.get('/me', getCurrentUser);
//for postman
router.get('/:id', getUserById);


export default router;
