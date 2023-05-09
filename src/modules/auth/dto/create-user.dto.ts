import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address_main: string;
  @IsString()
  @IsOptional()
  address_sub: string;
  @IsString()
  @IsNotEmpty()
  birth: string;
  @IsString()
  @IsNotEmpty()
  tel: string;
}
