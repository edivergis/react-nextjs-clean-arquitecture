import { UserGateway } from "@/domain/gateways/user.gateway";
import { Usecase } from "../usecase";
import { User } from "@/domain/entities/user";

 export type CreateUserInputDto = {
    username: string;
    password: string;
    email: string
  };
  
  export type CreateUserOutputDto = {
    id: string;
  };
  
  export class CreateUserUsecase
      implements Usecase<CreateUserInputDto, CreateUserOutputDto>
  {
      private constructor(private readonly userGateway: UserGateway) {}
  
      public static create(userGateway: UserGateway) {
          return new CreateUserUsecase(userGateway);
      }
  
      public async execute(input:CreateUserInputDto): Promise<CreateUserOutputDto> {
          const id = await this.userGateway.create(input);
          const output = this.presentOutput(id);
  
          return output;
      }
  
      private presentOutput(id: string): CreateUserOutputDto {
          return {
            id: id
        };
      }
  }