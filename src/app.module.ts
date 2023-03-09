import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_DATABASE_URL } from '../config'
import { UserModule } from '../src/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'

@Module({
    imports: [
        ArticleModule,
        UserModule,
        MongooseModule.forRoot(MONGO_DATABASE_URL)
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
