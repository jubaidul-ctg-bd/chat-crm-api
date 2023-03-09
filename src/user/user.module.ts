import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_VALIDITY } from '../../config'
import { UserSchema } from '../../src/user/schemas/user.schema'
import { JwtRefreshTokenStrategy } from '../../src/user/strategies/jwt-refresh-token.strategy'
import { JwtStrategy } from '../../src/user/strategies/jwt.strategy'
import { UserController } from '../../src/user/user.controller'
import { UserService } from '../../src/user/user.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: ACCESS_TOKEN_SECRET,
                    signOptions: {
                        expiresIn: ACCESS_TOKEN_VALIDITY
                    }
                }
            }
        })
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy, JwtRefreshTokenStrategy]
})
export class UserModule {}
