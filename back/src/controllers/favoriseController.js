import Favorise from '../models/Favorise.js';
import Post from '../models/Post.js';

export const addFavorise = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const existingFavorise = await Favorise.findOne({ userId, postId });
        if (existingFavorise) {
            return res.status(400).json({ message: 'Post is already in favorites' });
        }

        const newFavorise = new Favorise({ userId, postId });
        await newFavorise.save();

        res.status(201).json({ message: 'Post added to favorites', favorise: newFavorise });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to favorites', error: error.message });
    }
};

export const removeFavorise = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const deletedFavorise = await Favorise.findOneAndDelete({ userId, postId });

        if (!deletedFavorise) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error: error.message });
    }
};

export const getAllFavorises = async (req, res) => {
    try {
        const userId = req.user.id;

/*      d'abord on cherche les champs postId des favoris de user,
        puis on récupère les documents Post dont les Ids correspondent aux postId des favoris :)

        this is for return directly posts instead of evaluation with postId  */

        const postsFavorises = await Post.find({
            _id: { $in: (await Favorise.find({ userId }).select('postId')).map(fav => fav.postId) }
        });

        res.status(200).json(postsFavorises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite posts', error: error.message });
    }
};

