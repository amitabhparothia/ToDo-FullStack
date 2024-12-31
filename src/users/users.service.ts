import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService { 
  constructor(
    @InjectRepository(User)
    public readonly userRepository : Repository<User> 
  ){}

  // ADD User 
  async login (createUserDto : CreateUserDto) {
    const{email , first_name ,last_name ,password , phoneNo } = createUserDto

    //Check the user is alredy in the database or not 
    const userResult = await this.userRepository.findOne({
      where : {email}
    });

    if(userResult){
      return "User already exist"
    }
    else{
      const user = this.userRepository.create({
        email,
        first_name,
        last_name,
        password,
        phone_number : phoneNo
      })
      const newUser = await this.userRepository.save(user);
      return newUser
    } 
  }


  // Find User By Id
  async userById(id : number) {
    const userResult = await this.userRepository.findOne({
      where: {id : id , is_deleted:false}
    })

    if(!userResult){
      throw new NotFoundException('User with this Id not found');
    }

    return userResult
  }


  // Find All Users
  async findAllUser() {
    const users = await this.userRepository.find({
      where : {is_deleted : false}
    })

    if(!users){
      throw new NotFoundException("Users not retrieved Successfully")
    }
    return users
  }


  //Update the User
  async updateUser(updateUserDto : UpdateUserDto){
    const{id , first_name , last_name , email , password , phoneNo} = updateUserDto

    const user = await this.userRepository.findOne({
      where : {id , is_deleted:false}
    })

    if(!user){
      throw new NotFoundException("User not found with this id")
    }

    //update the user with the new value
    user.first_name = first_name,
    user.last_name = last_name,
    user.email = email ,
    user.password = password,
    user.phone_number = phoneNo

    //save the user in the database 
    const newUser = await this.userRepository.save(user)

    return newUser;
  }


  //Delete User By Id
  async deleteUser(id : number){
    //Check User already exist or not 
    const existingUser = await this.userRepository.findOne({
      where : {id , is_deleted:false}
    })

    if(!existingUser){
      throw new NotFoundException('User Not found');
    }

    //Use Query to delete the user
    const query = `
    UPDATE "users"
    SET is_deleted = $1 , updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
    `;
    const parameters = [true ,id];

    //Execute the query
    const result = await this.userRepository.query(query , parameters);

    if(!result.length){
      throw new NotFoundException('Failed to delete the user')
    }
    return result[0]
  }


}
