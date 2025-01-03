import { IsNotEmpty , IsOptional } from "@nestjs/class-validator";
export class UpdateUserDto {
    @IsNotEmpty()
    id:number

    @IsOptional()
    first_name:string

    @IsOptional()
    last_name:string

    @IsOptional()
    email:string

    @IsOptional()
    password:string

    @IsOptional()
    phoneNo:string
}
