import { UserGateway } from "@/domain/gateways/user.gateway";
import { Usecase } from "../usecase";

export type DeleteUserInputDto = {
    id: string;
  };
  
  export type DeleteUserOutputDto = {
    id: string;
  };
  
  export class DeleteUserUsecase
      implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>
  {
      private constructor(private readonly userGateway: UserGateway) {}
  
      public static create(userGateway: UserGateway) {
          return new DeleteUserUsecase(userGateway);
      }
  
      public async execute(input:DeleteUserInputDto): Promise<DeleteUserOutputDto> {
          const id = await this.userGateway.delete(input.id);
          const output = this.presentOutput(id);
  
          return output;
      }
  
      private presentOutput(id: string): DeleteUserOutputDto {
          return {
            id: id
        };
      }
  }