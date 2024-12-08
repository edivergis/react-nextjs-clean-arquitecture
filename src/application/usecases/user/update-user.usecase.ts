import { UserGateway } from "@/domain/gateways/user.gateway";
import { Usecase } from "../usecase";
import { User } from "@/domain/entities/user";

export type UpdateUserInputDto = {
    id: string;
    username: string;
    password: string;
    email: string
  };
  
  export type UpdateUserOutputDto = {
    id: string;
  };
  
  export class UpdateUserUsecase
      implements Usecase<UpdateUserInputDto, UpdateUserOutputDto>
  {
      private constructor(private readonly userGateway: UserGateway) {}
  
      public static create(userGateway: UserGateway) {
          return new UpdateUserUsecase(userGateway);
      }
  
      public async execute(input:UpdateUserInputDto): Promise<UpdateUserOutputDto> {
        const id = await this.userGateway.update(input);
        const output = this.presentOutput(id);
        return output;
      }
  
      private presentOutput(id: string): UpdateUserOutputDto {
          return {
            id: id
        };
      }
  }