import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceInterface } from 'src/interfaces/auth.service.interface';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user/user.entity';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async login(createUserDto: CreateUserDto): Promise<any> {
        const payload = { username: createUserDto.email, sub: createUserDto.password }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    async validateUser(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(createUserDto.email)
        if (user && user.password === createUserDto.password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
