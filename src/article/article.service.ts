import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCommentDto } from 'src/article/dto/create-comment.dto'
import { Article } from 'src/article/interfaces/article.interface'
import { Comment } from 'src/article/interfaces/comment.interface'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('Article') private readonly articleModel: Model<Article>,
        @InjectModel('Comment') private readonly commentModel: Model<Comment>
    ) {}

    async create(
        createArticleDto: CreateArticleDto,
        user: string
    ): Promise<Article> {
        const createArticle = new this.articleModel({
            ...createArticleDto,
            user
        })
        return createArticle.save()
    }

    async createComment(
        createCommentDto: CreateCommentDto,
        user: string
    ): Promise<any> {
        const createComment = new this.commentModel({
            text: createCommentDto.text,
            user
        })
        await createComment.save()

        return await this.articleModel.findOneAndUpdate(
            {
                _id: createCommentDto.articleId
            },
            { $push: { comments: createComment._id } }
        )
    }

    async findAll(query): Promise<Article[]> {
        return this.articleModel
            .find(
                {},
                {},
                {
                    skip: +query.limit * (+query.page - 1),
                    limit: +query.limit
                }
            )
            .populate({
                path: 'user',
                select: 'name'
            })
            .exec()
    }

    findOne(id: string) {
        return this.articleModel.findById(id).populate([
            {
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            },
            {
                path: 'user',
                select: 'name'
            }
        ])
    }

    async update(id: string, updateArticleDto: UpdateArticleDto, user) {
        if (
            await this.articleModel.findOne({
                _id: id,
                user: user.userId
            })
        )
            return await this.articleModel.findOneAndUpdate(
                {
                    _id: id
                },
                updateArticleDto
            )
        else {
            throw new BadRequestException()
        }
    }

    async updateComment(id: string, updateArticleDto: UpdateArticleDto, user) {
        if (
            await this.articleModel.findOne({
                _id: id,
                user: user.userId
            })
        )
            return await this.articleModel.findOneAndUpdate(
                {
                    _id: id
                },
                updateArticleDto
            )
        else {
            throw new BadRequestException()
        }
    }

    async remove(id: string, user) {
        if (
            user.UserRole == 'admin' ||
            (await this.articleModel.findOne({
                _id: id,
                user: user.userId
            }))
        )
            return await this.articleModel.findOneAndRemove({
                _id: id
            })
        else {
            throw new BadRequestException()
        }
    }

    async removeComment(id: string, user) {
        if (
            user.UserRole == 'admin' ||
            (await this.commentModel.findOne({
                _id: id,
                user: user.userId
            }))
        )
            return await this.commentModel.findOneAndRemove({
                _id: id
            })
        else {
            throw new BadRequestException()
        }
    }
}
