import {BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto, RegisterDto} from "./dto/auth.dto";
import {AuthResponse} from "./types/auth.types";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<BadRequestException | AuthResponse>
  {
    return this.authService.register(dto)
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponse>
  {
    return this.authService.login(dto)
  }
}