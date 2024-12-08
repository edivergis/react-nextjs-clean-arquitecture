
'use client'

import { GetUserUsecase } from "@/application/usecases/user/get-user.usecase";
import { UpdateUserUsecase } from "@/application/usecases/user/update-user.usecase";
import { UserProps } from "@/domain/entities/user";
import { container, Registry } from "@/infra/container-registry";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect} from "react";

export default function EditPage ()  {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<UserProps| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const useCase = container.get<GetUserUsecase>(Registry.GetUserUsecase);
        const result = await useCase.execute({id:userId})
        setUser(result)
        return result
      } catch (err) {
        setError(`Erro ao carregar os dados do usuário. ${err}`);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const useCase = container.get<UpdateUserUsecase>(Registry.UpdateUserUsecase);
      const result = await useCase.execute(user)
      
      if (!result) {
        throw new Error('Erro ao atualizar o usuário.');
      }

      alert("Usuário atualizado com sucesso!");
      router.back()
    } catch (err) {
      setError(`Erro ao atualizar os dados do usuário. ${err}`);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-white-800">Editar Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white-700">Nome</label>
          <input
            type="text"
            value={user?.username || ""}
            onChange={(e) => setUser({ ...user!, username: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white-700">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            onChange={(e) => setUser({ ...user!, email: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white-700">password</label>
          <input
            type="text"
            value={user?.password || ""}
            onChange={(e) => setUser({ ...user!, password: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}