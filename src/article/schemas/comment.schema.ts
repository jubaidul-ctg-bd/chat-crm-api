import * as mongoose from 'mongoose'

export const CommentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String
    },
    {
        timestamps: true
    }
)
