import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getCurrentDateTime from '../utils/CurrentDateTime.js';


const __filename = fileURLToPath(import.meta.url); 
//contains the absolute path of the current file (/path/to/current/file.js).

const __dirname = path.dirname(__filename);
//extracts the directory portion of this path (e.g., /path/to/current without the file name).

// Storage configuration
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const userId = req.user.id || 'unknown';
            const currentDate = getCurrentDateTime(); // Extract current date
            const dynamicPath = path.join(__dirname, '../../uploads', userId ,'/posts');

            // Log the dynamic path
            console.log('Files stored in :', dynamicPath);

            // Create the directory if it doesn't exist
            if (!fs.existsSync(dynamicPath)) {
                fs.mkdirSync(dynamicPath, { recursive: true });
                console.log('Directory created:', dynamicPath);
            } else {
                console.log('Directory already exists:', dynamicPath);
            }

            cb(null, dynamicPath); // Set the destination to the dynamic path
        } catch (error) {
            console.error('Error creating directory:', error);
            cb(error); // Pass the error to multer
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${getCurrentDateTime()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});



const pfpStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const userId = req.user.id || 'unknown';
            const currentDate = getCurrentDateTime(); // Extract current date
            const dynamicPath = path.join(__dirname, '../../uploads', userId);

            // Log the dynamic path
            console.log('Dynamic Path:', dynamicPath);

            // Create the directory if it doesn't exist
            if (!fs.existsSync(dynamicPath)) {
                fs.mkdirSync(dynamicPath, { recursive: true });
                console.log('Directory created:', dynamicPath);
            } else {
                console.log('Directory already exists:', dynamicPath);
            }

            cb(null, dynamicPath); // Set the destination to the dynamic path
        } catch (error) {
            console.error('Error creating directory:', error);
            cb(error); // Pass the error to multer
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${getCurrentDateTime()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// File extension filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed!'), false); 
    }
};

// Define limits (e.g., file size)
const postLimits = {
    fileSize: 20 * 1024 * 1024, // 20 MB
};

const pfpLimits = {
    fileSize: 2 * 1024 * 1024, // 2 MB
};

// Multer config for uploading Posts & Pfps
const uploadPostImages = multer({
    storage: postStorage,
    fileFilter,
    postLimits,
});

const uploadPfp = multer({
    storage: pfpStorage,
    fileFilter,
    pfpLimits,
});

export { uploadPostImages, uploadPfp };

