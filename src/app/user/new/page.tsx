
'use client'

import { CreateUserUsecase } from "@/application/usecases/user/create-user.usecase";
import { container, Registry } from "@/infra/container-registry";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const useCase = container.get<CreateUserUsecase>(Registry.CreateUserUsecase);
      const result = await useCase.execute(user)

      if (!result) {
        throw new Error('Erro ao criar o usuário.');
      }

      alert("Usuário criado com sucesso!");
      router.push("/user")
    } catch (err) {
      setError(`Erro ao atualizar os dados do usuário. ${err}`);
    }
  };

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
          Criar usuário
        </button>
      </form>
    </div>
  );
}