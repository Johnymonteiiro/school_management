import { env } from "@/env";
import DashboardCards from "./card";
import { Suspense } from "react";

async function fetchData(url: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Erro ao buscar dados de ${url}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching dashboard:", error);
  }
}

export default async function Home() {
  // const [students, subjects, teachers, classes] = await Promise.all([
  //   fetchData(`${env.NEXT_PUBLIC_BASE_URL}/alunos`),
  //   fetchData(`${env.NEXT_PUBLIC_BASE_URL}/disciplinas`),
  //   fetchData(`${env.NEXT_PUBLIC_BASE_URL}/professores`),
  //   fetchData(`${env.NEXT_PUBLIC_BASE_URL}/turmas`),
  // ]);

  const data = [
    {
      title: "Estudantes",
      value: 0, //students?.length || 0,
      date: "Atualizado hoje",
    },
    {
      title: "Disciplinas",
      value: 0, // subjects?.length || 0,
      date: "Atualizado hoje",
    },
    {
      title: "Professores",
      value: 0, // teachers?.length || 0,
      date: "Atualizado hoje",
    },
    {
      title: "Turmas",
      value: 0, // classes?.length || 0,
      date: "Atualizado hoje",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="w-full">
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardCards data={data} />
        </Suspense>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
    </div>
  );
}
