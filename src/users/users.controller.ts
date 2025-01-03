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
      return data
    } catch(error) {
      return 
    }
  }

  @Post('view_by_id')
  async userByID(@Body('id') id : number){
    try{
      const data = await this.usersService.userById(id);
      return data
    }catch (error){
      return "user with this id not found"
    }
  }

  @Get('view_all')
  async allUsers(){
    try{
      const data = this.usersService.findAllUser();
      return data
    } catch(error){
      return "No user found"
    }
  }

  @Post('update_user')
  async updateUser(@Body() updateUserDto : UpdateUserDto){
    try{
      const data = await this.usersService.updateUser(updateUserDto)
      return data;
    }catch(error){
      return "User not exist with this id"
    }
  }

  @Post('delete_user')
  async deleteUser(@Body('id') id:number){
    try{
      const data = await this.usersService.deleteUser(id);
      return data
    }catch(error){
      return "user not found"
    }
  }
}
