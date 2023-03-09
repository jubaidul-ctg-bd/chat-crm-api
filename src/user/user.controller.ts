import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common'
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard'
import { JwtRefreshGuard } from '../../src/common/guards/jwt-refresh.guard'
import { ResponseInterceptor } from '../../src/common/interceptors/response.interceptor'
import { CreateUserDto } from '../../src/user/dto/create-user.dto'
import { UpdateUserDto } from '../../src/user/dto/update-user.dto'
import { UserService } from '../../src/user/user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get('getInfo')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async findOne(@Req() req) {
        return this.userService.findOne(req.user.userId)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body) {
        return {
            message: 'Login Successful',
            data: await this.userService.login(body)
        }
    }

    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ResponseInterceptor)
    @Post('refreshToken')
    async refreshToken(@Req() req) {
        return {
            message: 'Token Refreshed Successfully',
            result: await this.userService.refreshToken(req.user)
        }
    }
}
