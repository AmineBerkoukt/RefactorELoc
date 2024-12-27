import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import statsRoutes from './src/routes/statsRoutes.js';
import oauth2Routes from './src/routes/oauth2Routes.js';
import authRoutes from './src/routes/authRoutes.js';
import requestRoutes from "./src/routes/requestRoutes.js";
import favoriseRoutes from './src/routes/favoriseRoutes.js';
import evaluateRoutes from "./src/routes/evaluateRoutes.js";
import passport from 'passport';
import http from 'http';
//Multer config :
import {uploadPostImages , uploadPfp} from './src/config/upload.js';
import { authenticateToken } from './src/middlewares/authMiddleware.js';


//Socket
import cors from 'cors';
import { app, server } from "./src/config/socket.js";
import path from "path";
import {fileURLToPath} from "url";
import messageRoutes from "./src/routes/messageRoutes.js";

dotenv.config();
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(authenticateToken);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Auth routes :

// Routes
app.use('/api/auth', oauth2Routes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/favorises', favoriseRoutes);
app.use('/api/evaluations', evaluateRoutes);
app.use('/api/messages', messageRoutes);


// Route to test file upload
app.post('/uploadPost', uploadPostImages.array('images', 6), (req, res) => {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    // Collect paths of uploaded files
    const filePaths = req.files.map((file) => file.path);

    res.status(200).json({
        message: `Files uploaded successfully!`,
        paths: filePaths, // Return all file paths
    });
});


app.post('/uploadPfp', uploadPfp.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.status(200).json({
        message: `File uploaded !`,
        path: req.file.path,
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to the Express MongoDB Project! Meow');
});

app.get('/result', (req, res) => {
    res.send('Meow');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
