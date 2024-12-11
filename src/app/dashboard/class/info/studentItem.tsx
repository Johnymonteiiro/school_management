"use client"

import { addStudentClass } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

import { toast } from "sonner";
import { Aluno, Current_Aluno } from "./[...slug]/page";

interface StudentItemProps {
  current_student_class: Current_Aluno[];
  alunos: Aluno[],
  id_turma:number
}

export default function StudentItem({ current_student_class,alunos, id_turma}: StudentItemProps) {

  async function addingNewStudent(id_aluno: number, nome: string) {
    const studentExist = current_student_class.find(
      (aluno) => aluno.nome_aluno === nome
    );

    if (studentExist) {
      console.log(`O aluno com ID ${id_aluno} já está na turma.`);
      return;
    } else {
      const res = await addStudentClass(id_aluno, id_turma);
      if (res.status === 201) {
        toast.success(`${nome} was added to this class`);
      } else {
        toast.error(`${nome} was not added to this class`);
      }
    }
  }

  return (
    <CardContent className="space-y-2">
      {alunos.map((aluno) => (
        <div
          key={aluno.id_aluno}
          className="flex items-center justify-between border-b p-2"
        >
          <div>
            <p>Nome: {aluno.nome}</p>
            <p>Gênero: {aluno.genero}</p>
            <p>Matrícula: {aluno.matricula}</p>
          </div>
          <Button onClick={() => addingNewStudent(aluno.id_aluno, aluno.nome)}>
            Adicionar
          </Button>
        </div>
      ))}
    </CardContent>
  );
}
