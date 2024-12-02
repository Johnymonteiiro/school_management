

import { UserPlus, Users } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableTeacherForm } from "./create-teacher";
import { TeachersTable } from "./teacher-table";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

export type TeacherType = {
  codigo: string;
  email: string;
  especialidade: string;
  genero: "Masculino" | "Feminino" | "Outro"; 
  id_professor: number;
  nome: string;
  status: "Ativo" | "Inativo";
  telefone: string;
};


export default async function Teachers() {
   const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/professores`);
   const teachers: TeacherType[] = await data.json();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="stroke-blue-500" />
            <strong className="ml-2">Teachers</strong>
          </div>

          <div className="flex items-center">
            <Modal
              title="New Teacher"
              button={
                <Button className="flex items-center ml-3 justify-between">
                  <UserPlus />
                  <span>New Teacher</span>
                </Button>
              }
            >
              <ReusableTeacherForm />
            </Modal>
          </div>
        </div>

        <TeachersTable teacher_data={teachers}  />
      </div>
    </div>
  );
}
