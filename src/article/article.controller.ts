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
    Query,
    Req,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { CreateCommentDto } from '../../src/article/dto/create-comment.dto'
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    create(
        @Body(ValidationPipe) createArticleDto: CreateArticleDto,
        @Req() req
    ) {
        return this.articleService.create(createArticleDto, req.user.userId)
    }

    @Post('comment')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    createComment(
        @Body(ValidationPipe) createCommentDto: CreateCommentDto,
        @Req() req
    ) {
        return this.articleService.createComment(
            createCommentDto,
            req.user.userId
        )
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() Query) {
        return this.articleService.findAll(Query)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articleService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
        @Req() req
    ) {
        return this.articleService.update(id, updateArticleDto, req.user)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    updateComment(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
        @Req() req
    ) {
        return this.articleService.update(id, updateArticleDto, req.user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string, @Req() req) {
        return this.articleService.remove(id, req.user)
    }

    @Delete('comment/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    removeComment(@Param('id') id: string, @Req() req) {
        return this.articleService.removeComment(id, req.user)
    }
}
