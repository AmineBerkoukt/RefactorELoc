import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const googleOAuth2Callback = async (req, res) => {
    try {
        const user = req.user;

        // Find user in database by email
        const existingUser = await User.findOne({ email: user.profile.emails[0].value });

        // Decode the token payload
        const decoded = jwt.decode(user.accessToken);


        // Saving user to DB IF they doesn't already exist !
        if (!existingUser) {
            const newUser = new User({
                email: user.profile.emails[0].value,
                firstName: user.profile.name.givenName,
                lastName: user.profile.name.familyName ? user.profile.name.familyName : "",
                role: 'student',
                googleId: user.profile.id
            });
            await newUser.save();
        }


        const userData = await User.findOne({ email: user.profile.emails[0].value });
        const userId = String(userData._id);
        console.log("User id : " , userId);



        //New access token :
        const updatedPayload = {
            ...decoded,
            userId,
            role: existingUser ? existingUser.role : 'student'
        };


        // Sign the token with the updated payload
        const newAccessToken = jwt.sign(updatedPayload, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '30d'
        });

        res.json({
            message: 'Authentication successful',
            accessToken: newAccessToken,
            profile: user.profile,
            role: updatedPayload.role // Include role in response
        });

    } catch (error) {
        console.error('OAuth callback error:', error);
        res.status(500).json({
            message: 'Authentication failed',
            error: error.message
        });
    }
};