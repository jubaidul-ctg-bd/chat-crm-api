import * as mongoose from 'mongoose'
import { UserRole } from '../../../src/user/enums/role.enum'

export const UserSchema = new mongoose.Schema(
    {
        name: String,
        userName: String,
        password: String,
        userRole: {
            type: String,
            enum: UserRole,
            default: UserRole.STAFF
        }
    },
    {
        timestamps: true
    }
)
