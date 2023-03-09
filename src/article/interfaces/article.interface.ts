import { Document } from 'mongoose'
import { Comment } from 'src/article/interfaces/comment.interface'
import { User } from 'src/User/interfaces/User.interface'

export interface Article extends Document {
    readonly user: User
    readonly title: string
    readonly body: string
    readonly comments: Comment[]
}
