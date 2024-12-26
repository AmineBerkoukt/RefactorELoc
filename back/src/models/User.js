import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phoneNumber: { type: String, required: false, unique: true },
    address: { type: String, required: false },
    role: { type: String, required: true, enum: ['admin', 'house_owner', 'student'] },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
