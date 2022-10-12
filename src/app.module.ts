import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {getTypeOrmConfig} from "./config/typeorm.config";
import {UserModule} from "./user/user.module";
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UserModule, AuthModule, PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}