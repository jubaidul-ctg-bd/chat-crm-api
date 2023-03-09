import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ACCESS_TOKEN_SECRET } from '../../../config'
import { UserService } from '../../../src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKEN_SECRET
        })
    }

    async validate(payload: any) {
        const { userName } = payload
        const user = await this.userService.getUser(userName)

        return { ...payload, userId: user._id }
    }
}
