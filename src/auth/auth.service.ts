import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptOptions } from 'src/config/config';
import { AuthServiceInterface } from 'src/interfaces/auth.service.interface';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    async register(registerDto: CreateUserDto): Promise<any> {
        let user = await this.usersService.findOneByEmail(registerDto.email)
        if (user?.id) {
            throw new BadRequestException('username is exist')
        }
        const profile = await this.usersService.createUser(registerDto)
        const token = this.generateToken(profile.id, profile.email)
        return { ...profile, token }
    }

    async login(loginDto: LoginUserDto): Promise<any> {
        const user = await this.validateUser(loginDto)
        const token = this.generateToken(user.id, user.email)
        return { ...user, token }
    }
    async validateUser(loginDto: LoginUserDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(loginDto.email)
        if (!user) {
            throw new BadRequestException('user is not exist')
        }

        const encryptPass = await bcrypt.compare(loginDto.password,user.password)
      
        if (encryptPass) {
            throw new BadRequestException('password is invalid')
        }

        return loginDto;
    }

    generateToken(userId: number, email: string) {
        return this.jwtService.sign({ userId, email })
    }
}
