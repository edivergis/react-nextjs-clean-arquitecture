import { ListUserOutputDto } from "@/application/usecases/user/list-user.usecase";
import { UpdateUserInputDto } from "@/application/usecases/user/update-user.usecase";
import { User } from "@/domain/entities/user";
import { UserGateway } from "@/domain/gateways/user.gateway";
import { AxiosInstance } from "axios";

export class UsertHttpService implements UserGateway {
    constructor(private http: AxiosInstance) {}

    async findAll(): Promise<User[]> {
      return this.http.get<ListUserOutputDto>("/users").then((res) =>
        res.data.users.map(
          (data) =>
            new User({
              id: data.id,
              username: data.username,
              password: data.password,
              email: data.email
            })
        )
      );
    }
  
    async findById(id: string): Promise<User> {
      return this.http.get<User>(`/user/${id}`).then((res) => {
        return new User({
            id: res.data.id,
            username: res.data.username,
            password: res.data.password,
            email: res.data.email
        });
      });
    }

    async create(user: User): Promise<string> {
      console.log(user)
      return await this.http.post<UpdateUserInputDto>(`/user`, user, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        return res.data.id;
      });;
    }

    async update(user: UpdateUserInputDto): Promise<string> {
      
      return await this.http.put<UpdateUserInputDto>(`/user/${user.id}`, user, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        return res.data.id;
      });
    }

    async delete(id: string): Promise<string> {
      return this.http.delete<User>(`/user/${id}`).then((res) => {
        return res.data.id;;
      });
    }
  }