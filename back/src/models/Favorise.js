import mongoose from 'mongoose';

const FavoriseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

export default mongoose.model('Favorise', FavoriseSchema);