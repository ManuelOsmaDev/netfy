import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUser:CreateUserDto){
    return this.authService.register(registerUser);
  }

  @Post('login')
  login(@Body() loginDTO:LoginDTO){
    return this.authService.login(loginDTO);
  }
  
  
  
}
