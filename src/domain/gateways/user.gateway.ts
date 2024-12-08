import { UpdateUserInputDto } from "@/application/usecases/user/update-user.usecase";
import { User } from "../entities/user";
import { CreateUserInputDto } from "@/application/usecases/user/create-user.usecase";

export interface UserGateway{
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(user:CreateUserInputDto): Promise<string>
    update(user:UpdateUserInputDto): Promise<string>
    delete(id:string): Promise<string>
}