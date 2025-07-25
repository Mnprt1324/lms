const Joi = require("joi")


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8–30 characters, with uppercase, lowercase, number, and special character.',
        }),
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8–30 characters, with uppercase, lowercase, number, and special character.',
        })
});




module.exports = {
    registerSchema,
    loginSchema
}