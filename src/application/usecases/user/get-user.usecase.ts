import { User } from "@/domain/entities/user";
import { UserGateway } from "@/domain/gateways/user.gateway";
import { Usecase } from "../usecase";


export type GetUserInputDto = {
  id:string
};

export type GetUserOutputDto = {
  id: string;
  username: string;
  password: string;
  email: string
};

export class GetUserUsecase
    implements Usecase<GetUserInputDto, GetUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new GetUserUsecase(userGateway);
    }

    public async execute(input:GetUserInputDto): Promise<GetUserOutputDto> {
        const aUsers = await this.userGateway.findById(input.id);
        const output = this.presentOutput(aUsers);

        return output;
    }

    private presentOutput(user: User): GetUserOutputDto {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email
      };;
    }
}