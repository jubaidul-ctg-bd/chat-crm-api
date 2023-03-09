import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { REFRESH_TOKEN_SECRET } from '../../../config'
import { UserService } from '../../../src/user/user.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: REFRESH_TOKEN_SECRET
        })
    }

    async validate(payload: any) {
        const { userName } = payload
        const user = await this.userService.getUser(userName)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
