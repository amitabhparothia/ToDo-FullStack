import { Module } from '@nestjs/common';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true , envFilePath : ['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (ConfigService : ConfigService) => ({
          type : "postgres",
          host : ConfigService.get("DATABASE_HOST"),
          port : ConfigService.get<number>("DATABASE_PORT"),
          database : ConfigService.get("DATABASE_NAME"),
          username : ConfigService.get("DATABASE_USERNAME"),
          password : ConfigService.get("DATABASE_PASSWORD"),
          synchronize : false,
          logging : true,
          entities : [User]
      })
    }),
    UsersModule,
    TodoModule   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
