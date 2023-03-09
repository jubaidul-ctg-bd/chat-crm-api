import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as argon2 from 'argon2'
import { Model } from 'mongoose'
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_VALIDITY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_VALIDITY
} from '../../config'
import { User } from '../../src/User/interfaces/User.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await argon2.hash(createUserDto.password)

        const createUser = new this.userModel(createUserDto)
        return createUser.save()
    }

    async login(userData: any): Promise<any> {
        const user = await this.validateUser(
            userData.userName,
            userData.password
        )
        const payload = {
            userName: user.userName,
            phone: user.phone,
            userRole: user.userRole
        }
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(
                { username: user.name, phone: user.phone },
                {
                    secret: ACCESS_TOKEN_SECRET,
                    expiresIn: ACCESS_TOKEN_VALIDITY
                }
            )
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userModel
            .findOne({ userName: username }, '+password')
            .exec()

        if (user && (await argon2.verify(user.password, password))) {
            return user
        } else {
            throw new UnauthorizedException()
        }
    }

    async getUser(username: string): Promise<any> {
        return await this.userModel.findOne({ userName: username }).exec()
    }

    async refreshToken(user: any): Promise<any> {
        const payload = {
            username: user.name,
            phone: user.phone,
            userRole: user.userRole
        }
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(
                { username: user.name, phone: user.phone },
                {
                    secret: REFRESH_TOKEN_SECRET,
                    expiresIn: REFRESH_TOKEN_VALIDITY
                }
            )
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findOne(id: string) {
        return await this.userModel.findOne({ _id: id }, '-password').exec()
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} User`
    }

    remove(id: number) {
        return `This action removes a #${id} User`
    }
}
