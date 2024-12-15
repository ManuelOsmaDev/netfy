import { UsersService } from './../users/users.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async register(createUserDto:CreateUserDto){
    const existingEmail = await this.usersService.findByEmail(createUserDto.email);
    if(existingEmail){
      throw new ConflictException('El correo ya está en uso.');
    }

    //con esto hasheo mi contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password,10);

    
    const createdUser =  await this.usersService.create({
      ...createUserDto,
      password:hashedPassword,
      
    })
    return createdUser
  }

  async login(loginDTo:LoginDTO){
    const {email, password} = loginDTo;

    const user = await this.usersService.findByEmail(email);
    if(!user){
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    
    if(!isPasswordValid){
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const userWithOutPass = {...user};
    delete userWithOutPass.password
    const jwt = {id:user.id, email:user.email}
    const accessToken =  this.jwtService.sign(jwt, {expiresIn: "4m"});
    const decodedToken = this.jwtService.decode(accessToken) as any;
    const response = {
      message:"Usuario logueado con exito.",
      response: {
        data:userWithOutPass,
        token:accessToken,
        expiresAt:new Date(decodedToken.exp * 1000).toISOString()
      }
    }

    return response

  }
}
