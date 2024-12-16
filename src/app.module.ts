import { Module } from '@nestjs/common';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true , envFilePath : ['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (ConfigService : ConfigService) => ({
          type : "postgres",
          host : ConfigService.get("DATABASE_HOST"),
          post : ConfigService.get<number>("DATABASE_PORT"),
          database : ConfigService.get("DATABASE_NAME"),
          username : ConfigService.get("DATABASE_USERNAME"),
          password : ConfigService.get("DATABASE_PASSWORD"),
          synchronize : ConfigService.get<boolean>("DATABASE_SYNC"),
          logging : ConfigService.get<boolean>("DATABASE_LOGGING")
      })
    }),
    UsersModule,
    TodoModule   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
