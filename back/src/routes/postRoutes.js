import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getAllPostsPaginated,
    getTopRatedPosts, likePost,
} from '../controllers/postController.js';
//import { protectRoute } from '../middlewares/authMiddleware.js';
import {uploadPostImages} from '../config/upload.js';
import {validatePostCreation , validatePostUpdate} from "../validations/postValidator.js";
import {restrictTo} from "../middlewares/authMiddleware.js";


const router = express.Router();


//router.post('/', protectxxx, upload.single('images', 6), createPost) do NOT use UNTIL Auth is set up
router.post('/create', validatePostCreation , uploadPostImages.single('images', 6), createPost); // 6 images Max

router.post('/like', likePost);

router.get('/', getAllPosts);

router.get('/paginated', getAllPostsPaginated);

router.get('/topRated', getTopRatedPosts);

router.get('/:id', getPostById);

//router.put('/:id', protect, updatePost);
router.patch('/:id', validatePostUpdate, updatePost);

//router.delete('/:id', protect, deletePost);
router.delete('/:id', deletePost);

export default router;
