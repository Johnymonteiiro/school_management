import { addStudentClass, GetData } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/env";
import { toast } from "sonner";
import StudentItem from "../studentItem";

export interface TurmaType {
  ano_letivo: number;
  capacidade: number;
  id_turma: number;
  nome: string;
  semestre: string;
  serie: string;
  fk_Disciplina_id_disciplina: number;
  fk_Professor_id_professor: number;
}
export type Disciplina = {
  carga_horaria: number;
  codigo: string;
  descricao: string;
  id_disciplina: number;
  nome_disciplina: string;
};

export type Professor = {
  email: string;
  especialidade: string;
  nome: string;
  telefone: string;
  id_professor: number;
};

export type Aluno = {
  genero: "Masculino" | "Feminino" | "Outro";
  id_aluno: number;
  matricula: string;
  nome: string;
};

export type Current_Aluno = {
  nota: string;
  nome_aluno: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: [string, string] }>;
}) {
  const [turmaId, turmaName] = (await params).slug;
  const turma_id = Number(turmaId);

  const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/turmas/${turma_id}`);
  let turmas: TurmaType[] = await data.json();

  const student_class = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/alunos_turma/${turma_id}`
  );
  let current_student_class: Current_Aluno[] = await student_class.json();

  turmas = Array.isArray(turmas) ? turmas : [turmas];

  const disciplinas: Disciplina[] = await GetData("disciplinas");
  const professores: Professor[] = await GetData("professores");
  const alunos: Aluno[] = await GetData("alunos");

  const filtered_class = turmas.map((turma) => ({
    ...turma,
    disciplinas: disciplinas.filter(
      (disciplina) =>
        disciplina.id_disciplina === turma.fk_Disciplina_id_disciplina
    ),
    professores: professores.filter(
      (professor) => professor.id_professor === turma.fk_Professor_id_professor
    ),
  }));

   async function addingNewStudent(id_aluno: number, nome: string) {
    const studentExist = current_student_class.find(
      (aluno) => aluno.nome_aluno === nome
    );

    if (studentExist) {
      console.log(`O aluno com ID ${id_aluno} já está na turma.`);
      return;
    } else {
      const res = await addStudentClass(id_aluno, turma_id);
      if (res.status === 201) {
        toast.success(`${nome} was added to this class`);
      } else {
        toast.error(`${nome} was not added to this class`)
      }
    }
  }

  return (
    <Tabs
      defaultValue="general-information"
      className="w-full relative top-20 px-6"
    >
      <h1>Turma: {turmaName}</h1>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general-information">
          General Information
        </TabsTrigger>
        <TabsTrigger value="students-list">Students List</TabsTrigger>
        <TabsTrigger value="create-class">Create Class</TabsTrigger>
      </TabsList>

      {/* Informações da Turma */}
      <TabsContent value="general-information">
        <Card>
          <CardHeader>
            <CardTitle>Turma Information</CardTitle>
            <CardDescription>Informações detalhadas da turma.</CardDescription>
          </CardHeader>
          <div className="flex w-full">
            <div className="w-[400px] pr-2">
              {filtered_class?.map((turma, index) => (
                <CardContent key={index} className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-base">Capacidade:</Label>
                    <p className="text-zinc-600 pl-1">{turma.capacidade}</p>
                  </div>
                  <div className="flex items-center">
                    <Label className="text-base">Série</Label>
                    <p className="text-zinc-600 pl-1">{turma.serie}</p>
                  </div>
                  <div className="flex items-center">
                    <Label className="text-base">Ano Letivo</Label>
                    <p className="text-zinc-600 pl-1">{turma.ano_letivo}</p>
                  </div>
                  <div className="flex items-center">
                    <Label className="text-base">Disciplinas:</Label>
                    {turma.disciplinas.map((disciplina, index) => (
                      <p className="text-zinc-600 pl-1" key={index}>
                        {disciplina.nome_disciplina}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Label className="text-base">Professores</Label>
                    {turma.professores.map((professor, index) => (
                      <p className="text-zinc-600 pl-1" key={index}>
                        {professor.nome}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Label className="text-base">Semestre</Label>
                    <p className="text-zinc-600 pl-1">{turma.semestre}</p>
                  </div>
                </CardContent>
              ))}
            </div>

            <div className="w-[500px]">
              <h2>Alunos</h2>

              <div className="mt-4">
                {current_student_class.length > 0 ? (
                  <>
                    {current_student_class.map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center py-2 justify-between border-t-2"
                      >
                        <p>Nome: {student.nome_aluno}</p>
                        <p>Nota: {student.nota}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>This class don't have any student</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      {/* Lista de Estudantes */}
      <TabsContent value="students-list">
        <Card>
          <CardHeader>
            <CardTitle>Register student</CardTitle>
            <CardDescription>Add student in this class</CardDescription>
          </CardHeader>
          <StudentItem
            id_turma={turma_id}
            alunos={alunos}
            current_student_class={current_student_class}
          />
          <CardFooter>
            <p>Total de Alunos: {alunos.length}</p>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Criar Aula */}
      <TabsContent value="create-class">
        <Card>
          <CardHeader>
            <CardTitle>Create Class</CardTitle>
            <CardDescription>Crie uma nova aula para a turma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="topic">Tópico da Aula</Label>
              <Input id="topic" placeholder="Ex: Introdução à Matemática" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date">Data</Label>
              <Input id="date" type="date" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Criar Aula</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
