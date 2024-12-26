import Joi from 'joi';

export const registrationSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().length(10).required(),
    address: Joi.string().trim().required(),
    studies: Joi.object({
        level: Joi.string().trim(),
        school: Joi.string().trim(),
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().required()
});


export const updateProfileSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    address: Joi.string().trim(),
    studies: Joi.object({
            level: Joi.string().trim(),
            school: Joi.string().trim(),
    }),

}).min(1); //au moins un champ est donné !!!
