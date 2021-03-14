import { Controller, Post, UseGuards, Request, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register (@Body() registerDto: CreateUserDto): Promise<any> {
    const userProfile = await this.authService.register(registerDto)
    return {
      user: userProfile,
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login (@Body() loginDto: LoginUserDto): Promise<any> {
    const userProfile = await this.authService.login(loginDto)
    return {
      user: userProfile,
    }
  }
}