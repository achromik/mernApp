import * as mongoose from 'mongoose';

import User from './user.interface';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        status: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);

const userModel = mongoose.model<User & mongoose.Document>('user', userSchema);

export default userModel;
