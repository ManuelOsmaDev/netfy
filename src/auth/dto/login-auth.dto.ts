import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO  {

@IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email: string;

  @IsString()
  password: string;
}
