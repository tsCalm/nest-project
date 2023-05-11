import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILoginParam } from '../types/dto';

export class LoginDto implements ILoginParam {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
