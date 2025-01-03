import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService
  ) {}

  @Post('add_todo')
  async add(@Body() createTodoDto : CreateTodoDto){
    try{
      const data = await this.todoService.add(createTodoDto)
      return data
    }catch{
      return "user with this id is not found"
    }

  }
}
