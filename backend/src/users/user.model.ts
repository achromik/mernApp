import * as mongoose from 'mongoose';
import User from './user.interface';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const userModel = mongoose.model<User & mongoose.Document>('user', userSchema);

export default userModel;
