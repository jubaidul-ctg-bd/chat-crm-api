import { Document } from 'mongoose'
import { UserRole } from 'src/user/enums/role.enum'

export interface User extends Document {
    readonly name: string
    readonly userName: string
    readonly password: string
    readonly UserRole: UserRole
}
