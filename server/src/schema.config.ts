import * as Joi from 'joi'


export const configValidationSchema = Joi.object({
    PUBLIC_DATABASE_URL:Joi.string().required(),
    JWT_SECRET:Joi.string().required(),
    REFRESH_SECRET:Joi.string().required(),
    GOOGLE_CLIENT_ID:Joi.string().required(),
    GOOGLE_SECRET:Joi.string().required(),
    GOOGLE_CALLBACK_URL:Joi.string().required(),
    CLIENT_URL:Joi.string().required(),
    CLOUDINARY_SECRET:Joi.string().required(),
    CLOUDINARY_KEY:Joi.string().required(),
    CLOUDINARY_NAME:Joi.string().required(),
})