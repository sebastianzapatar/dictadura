import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsEmail()
    email:string;
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?!.[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
            message:'The password must have a .....'
        }
    )
    password:string;
    @IsString()
    @MinLength(1)
    fullName:string;
    
}
