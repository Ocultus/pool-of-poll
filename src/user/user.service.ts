import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OneToMany, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user/user.entity';
import { omit } from 'lodash'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }


    async findOneByEmail(email : string): Promise<User> {
        return  await this.usersRepository.findOne({email});
    }

    async createUser(createUserDto: CreateUserDto){
        const result = await this.usersRepository.save(Object.assign(new User(),createUserDto))
        return omit(result,['password'])
    }
}
