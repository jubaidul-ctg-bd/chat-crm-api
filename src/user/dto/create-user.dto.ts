import { IsNotEmpty, IsString } from 'class-validator'
import { UserRole } from '../../../src/user/enums/role.enum'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    UserRole: UserRole
}
