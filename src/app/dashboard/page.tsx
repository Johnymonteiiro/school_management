import { env } from "@/env";
import DashboardCards from "./card";

export default async function Home() {
  const [studentsRes, subjectsRes, teachersRes, classesRes] = await Promise.all(
    [
      fetch(`${env.NEXT_PUBLIC_BASE_URL}/alunos`),
      fetch(`${env.NEXT_PUBLIC_BASE_URL}/disciplinas`),
      fetch(`${env.NEXT_PUBLIC_BASE_URL}/professores`),
      fetch(`${env.NEXT_PUBLIC_BASE_URL}/turmas`),
    ]
  );

  const students = await studentsRes.json();
  const subjects = await subjectsRes.json();
  const teachers = await teachersRes.json();
  const classes = await classesRes.json();

  const data = [
    { title: "Estudantes", value: students.length, date: "Atualizado hoje" },
    { title: "Disciplinas", value: subjects.length, date: "Atualizado hoje" },
    { title: "Professores", value: teachers.length, date: "Atualizado hoje" },
    { title: "Turmas", value: classes.length, date: "Atualizado hoje" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="w-full">
        <DashboardCards data={data} />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        
      </div>
    </div>
  );
}
