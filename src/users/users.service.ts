import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SubscriptionType } from './enum/subscription-type.enum';

@Injectable()
export class UsersService {
   constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
   ){

   }

  async create(createUserDto: CreateUserDto):Promise<any> {

      const existingUserByEmail = await this.userRepository.findOneBy({email:createUserDto.email})
      const existingUserbyUserName = await this.userRepository.findOneBy({email:createUserDto.username})

      if(existingUserByEmail){
        throw new ConflictException("El correo ya esta en uso")
      }
      if(existingUserbyUserName){
        throw new ConflictException("Ya existe un Usuario con ese Username")
      }
      const newUser = this.userRepository.create(createUserDto);
      if(!Object.values(SubscriptionType).includes(createUserDto.subscription_type)){
        throw new BadRequestException(
          `El tipo de suscripción debe ser "free" o "premium".`,
        )
      }

      console.log("pasword hashed user", createUserDto.password);
      
      const createdUser = await this.userRepository.save(newUser)
      const response = {
        message: "Usuario creado con exito",
        reponse: createdUser
      }
      return response
  }


  async update(id: number, updateUserDto: UpdateUserDto):Promise<any> {

    const user = await this.userRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    await this.userRepository.update(id,updateUserDto);

    const updatedUser = await this.userRepository.findOneBy({id});
    return {
      message: "Usuario actualizado Correctamente",
      response: updatedUser
    }

  }

  findAll():Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number):Promise<User> {
    const user = await  this.userRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

 

  async remove(id: number) {

    const user = await this.userRepository.findOneBy({id});

    if(!user){
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    await this.userRepository.remove(user);

    return {
      message:"Usuario Eliminado con exito",
    }

  }

  findByEmail(email:string){
    return this.userRepository.findOneBy({email})
  }
}
