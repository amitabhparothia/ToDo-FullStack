import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        public readonly todoRepository: Repository<Todo>,

        @InjectRepository(User)
        public readonly userRepository: Repository<User>
    ) { }

    async add(createTodoDto:CreateTodoDto){
        const{userId , title , description} = createTodoDto
        //check the user in the db or not

        const userResult = await this.userRepository.findOne({
            where : {id : userId , is_deleted:false}
        })

        console.log("userresult" , userResult)

        if(userResult){
            const todo = this.todoRepository.create({
                userId,
                title,
                description,
                completed:false,
                is_deleted : false
                // if you dont want to define the date related things here the define in db ( use -> now() )
            })

            console.log("Todo " , todo)

            const createTodo = await this.todoRepository.save(todo)
            console.log("createTodo " , createTodo)
            return createTodo
        }
    }

}
