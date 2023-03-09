import { Document } from 'mongoose'
import { User } from 'src/User/interfaces/User.interface'

export interface Comment extends Document {
    readonly user: User
    readonly text: string
}
