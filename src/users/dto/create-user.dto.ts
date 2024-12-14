import {IsEmail, IsEnum, IsString, minLength, MinLength} from 'class-validator'
import { SubscriptionType } from '../enum/subscription-type.enum';

export class CreateUserDto {
    @IsString()
    @MinLength(2, {message: "El nombre debe tener al menos 2 caracteres."})
    name:string

    @IsEmail({},{message:"Debe proporcionar un correo electronico Válido."})
    email:string;

    @IsString()
    @MinLength(6, {message: "La contraseña debe tener al menos 6 caracteres."})
    password:string

    @IsString()
    @MinLength(6, {message: "El usuario debe tener al menos 6 caracteres."})
    username:string

    @IsEnum(SubscriptionType, {
        message: 'El tipo de suscripción debe ser "free" o "premium".',
      })
      subscription_type: SubscriptionType;
}