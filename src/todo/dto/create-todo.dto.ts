import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    userId:number

    @IsNotEmpty()
    @IsString()
    title:string

    @IsOptional()
    @IsString()
    description:string

    
}
