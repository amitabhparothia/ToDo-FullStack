import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() createUserDto : CreateUserDto){
    try {
      const data = await this.usersService.login(createUserDto);
      return (data)
    } catch(error) {
      return error 
    }
  }

  @Post('view_by_id')
  async userByID(@Body('id') id : number){
    try{
      const data = await this.usersService.userById(id);
      return data
    }catch (error){
      return error
    }
  }

  @Get('view_all')
  async allUsers(){
    try{
      const data = this.usersService.findAllUser;
      return data
    } catch(error){
      return error
    }
  }

  @Post('update_user')
  async updateUser(@Body() updateUserDto : UpdateUserDto){
    try{
      const data = await this.usersService.updateUser(updateUserDto)
      return data;
    }catch(error){
      return error
    }
  }

  @Post('delete_user')
  async deleteUser(@Body('id') id:number){
    try{
      const data = await this.usersService.deleteUser(id);
      return data
    }catch(error){
      return error
    }
  }
}
