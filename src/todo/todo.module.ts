import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Todo } from './entities/todo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User , Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
