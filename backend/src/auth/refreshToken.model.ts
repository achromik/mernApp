import * as mongoose from 'mongoose';

import { RefreshToken } from './refreshToken.interface';

const refreshTokenSchema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
    },
    userId: String,
});

const refreshTokenModel = mongoose.model<RefreshToken & mongoose.Document>(
    'refreshToken',
    refreshTokenSchema,
);

export default refreshTokenModel;
