import {IsEmail, MaxLength, MinLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string

    @MinLength(4, {message: "Минимальная длина пароля - 4 символов"})
    @MaxLength(16, {message: "Максимальная длина пароля - 16 символов"})
    password: string

}

export class RegisterDto {
    @IsEmail()
    email: string

    @MinLength(4, {message: "Минимальная длина пароля - 4 символов"})
    @MaxLength(16, {message: "Максимальная длина пароля - 16 символов"})
    password: string

    name: string
    surname: string
}