import { Container } from "inversify";
import { http } from "./http";
import { UsertHttpService } from "./services/user.http.service";
import { ListUserUsecase } from "@/application/usecases/user/list-user.usecase";
import { GetUserUsecase } from "@/application/usecases/user/get-user.usecase";
import { CreateUserUsecase } from "@/application/usecases/user/create-user.usecase";
import { DeleteUserUsecase } from "@/application/usecases/user/delete-user.usecase";
import { UpdateUserUsecase } from "@/application/usecases/user/update-user.usecase";

export const Registry = {
    AxiosAdapter: Symbol.for("AxiosAdapter"),
  
    UserGateway: Symbol.for("UserGateway"),
  
    ListUseUsecase: Symbol.for("ListUseUsecase"),
    GetUserUsecase: Symbol.for("GetUserUsecase"),
    CreateUserUsecase: Symbol.for("CreateUserUsecase"),
    DeleteUserUsecase: Symbol.for("DeleteUserUsecase"),
    UpdateUserUsecase: Symbol.for("UpdateUserUsecase")
  };
  
  export const container = new Container();
  
  //########## HTTP
  container.bind(Registry.AxiosAdapter).toConstantValue(http);
  
  //########## GATEWAYS
  container.bind(Registry.UserGateway).toDynamicValue((context) => {
    return new UsertHttpService(context.container.get(Registry.AxiosAdapter));
  });
  
  //########## USE CASES
  container.bind(Registry.ListUseUsecase).toDynamicValue((context) => {
    return ListUserUsecase.create(
      context.container.get(Registry.UserGateway)
    );
  });
  
  container.bind(Registry.GetUserUsecase).toDynamicValue((context) => {
    return GetUserUsecase.create(context.container.get(Registry.UserGateway));
  });

  container.bind(Registry.CreateUserUsecase).toDynamicValue((context) => {
    return CreateUserUsecase.create(context.container.get(Registry.UserGateway));
  });

  container.bind(Registry.DeleteUserUsecase).toDynamicValue((context) => {
    return DeleteUserUsecase.create(context.container.get(Registry.UserGateway));
  });

  container.bind(Registry.UpdateUserUsecase).toDynamicValue((context) => {
    return UpdateUserUsecase.create(context.container.get(Registry.UserGateway));
  });
