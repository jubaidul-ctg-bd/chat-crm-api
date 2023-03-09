import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleSchema } from '../../src/article/schemas/article.schema'
import { CommentSchema } from '../../src/article/schemas/comment.schema'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Article', schema: ArticleSchema },
            { name: 'Comment', schema: CommentSchema }
        ])
    ],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule {}
