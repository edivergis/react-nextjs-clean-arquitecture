'use client'

import { DeleteUserUsecase } from "@/application/usecases/user/delete-user.usecase";
import { ListUserUsecase } from "@/application/usecases/user/list-user.usecase";
import { UserProps } from "@/domain/entities/user";
import { container, Registry } from "@/infra/container-registry";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [userList, setUserList] = useState<UserProps[]>([]);
  
  useEffect(() => {
    async function fetchUsers() {
      const useCase = container.get<ListUserUsecase>(Registry.ListUseUsecase);
      const result = await useCase.execute();
      setUserList(result.users);
    }
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este usuário?');
    if (!confirmDelete) return;

    try {
    
      const useCase = container.get<DeleteUserUsecase>(Registry.DeleteUserUsecase);
      const result = await useCase.execute({ id: userId})
      
      if (!result) {
        throw new Error('Erro ao excluir o usuário.');
      }
      setUserList((prevUsers) => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      alert(`Erro ao excluir o usuário: ${error}`);
    }
  };
  
  return (
      <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-white-800">Lista de Usuários</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-auto w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Senha</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.password}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/user/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <span className="mx-2">|</span>
                  <button className="text-red-600 hover:underline"
                  onClick={() => handleDelete(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
              Home
            </button>
          </Link>
          <Link href="/user/new">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
              Cadastrar novo usuário
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}