import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]), UsersModule, JwtModule.register({
    secret:"NetfySuperSecreetBYME",
    signOptions:{expiresIn:"4m"}
  }),],
  exports:[TypeOrmModule, JwtModule]
})
export class AuthModule {}
