import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    articleId: string

    @IsNotEmpty()
    @IsString()
    text: string
}
