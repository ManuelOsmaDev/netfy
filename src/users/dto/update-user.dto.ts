import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { SubscriptionType } from '../enum/subscription-type.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @MinLength(2, {message: "El nombre debe tener al menos 2 caracteres."})
    name:string

    @IsEmail({},{message:"Debe proporcionar un correo electronico Válido."})
    email:string;

    @IsString()
    @MinLength(6, {message: "El usuario debe tener al menos 6 caracteres."})
    username:string

    @IsEnum(SubscriptionType, {
        message: 'El tipo de suscripción debe ser "free" o "premium".',
      })
      subscription_type: SubscriptionType;
}
