import { CreateUserDto } from "src/user/dto/create-user-dto";
import { User } from "src/user/user/user.entity";

export interface AuthServiceInterface {
    // register(createUserDto: CreateUserDto): Promise<User>;
     login(createUserDto: CreateUserDto): Promise<any>;
     validateUser(createUserDto: CreateUserDto): Promise<any>;
}

