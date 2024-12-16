import { Column } from "typeorm";
import { IsNotEmpty , IsOptional } from "@nestjs/class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    first_name:string

    @IsNotEmpty()
    last_name:string

    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    phoneNo: number
}
