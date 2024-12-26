import Evaluate from '../models/Evaluate.js';
import Post from "../models/Post.js";

//function for recalculate avgRate for 'add' or 'update' or 'delete' Evaluation
const updateAvgRate = async (postId) => {
    const evaluations = await Evaluate.find({ postId });
    console.log('find evaluation');

    // Calculer la moyenne si des évaluations existent, sinon la mettre à 0
    const avgRate = evaluations.length
        ? evaluations.reduce((sum, evaluation) => sum + evaluation.rate, 0) / evaluations.length
        : 0;

    //for testing
    const myPost = await Post.findOne({_id: postId});
    console.log('avgRate befor update', myPost.avgRate)

    // Mettre à jour le champ `avgRate` du post
    await Post.findByIdAndUpdate(postId, { avgRate });

    console.log('avgRate after update', myPost.avgRate)

};

// fcts for routes
export const addOrUpdateEvaluation = async (req, res) => {
    try {
        const { postId } = req.params;
        const { rate } = req.body;
        const userId = req.user.id;

        if (rate < 1 || rate > 5) {
            return res.status(400).json({ message: 'Rate should be between 1 and 5' });
        }
        //update Evaluation
        const existingEvaluation = await Evaluate.findOne({ userId, postId });

        if (existingEvaluation) {
            console.log('before update', existingEvaluation.rate);
            existingEvaluation.rate = rate;

            await existingEvaluation.save();
            console.log('apres update', existingEvaluation.rate);

            //recalculer le avgRate
            await updateAvgRate(postId);
            return res.status(200).json({ message: 'Evaluation updated', evaluation: existingEvaluation });
        }

        //post Evaluation
        const newEvaluation = new Evaluate({ userId, postId, rate });
        await newEvaluation.save();

        //recalculer le avgRate
        await updateAvgRate(postId);
        res.status(201).json({ message: 'Evaluation added', evaluation: newEvaluation });
    } catch (error) {
        res.status(500).json({ message: 'Error processing evaluation', error: error.message });
    }
};

export const deleteEvaluation = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const deletedEvaluation = await Evaluate.findOneAndDelete({ userId, postId });

        if (!deletedEvaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        //recalculer le avgRate
        await updateAvgRate(postId);

        res.status(200).json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting evaluation', error: error.message });
    }
};


export const getEvaluationsForPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const evaluations = await Evaluate.find({ postId }).populate('userId');
        res.status(200).json({ evaluations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching evaluations', error: error.message });
    }
};
