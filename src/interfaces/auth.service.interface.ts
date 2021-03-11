import { CreateUserDto } from "src/auth/dto/create-user-dto";
import { User } from "src/entity/user.entity";

export interface AuthServiceInterface {
     register(createUserDto: CreateUserDto): Promise<User>;
     login(createUserDto: CreateUserDto): Promise<any>;
     validateUser(createUserDto: CreateUserDto): void;
}

