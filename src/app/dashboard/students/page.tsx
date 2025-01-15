import { UserPlus, GraduationCap } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableStudentForm } from "./create-student";
import { StudentsTable } from "./student-table";
import { env } from "@/env";
import { Button } from "@/components/ui/button";

export type StudentsTypes = {
  id_aluno: number;
  genero: string;
  matricula: string;
  nome: string;
  serie: string;
  status: string;
};

const getStudents = async () => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/alunos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};

export default async function Students() {
  
  const data = await getStudents();
  const student: StudentsTypes[] = data ? await data.json() : [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="stroke-blue-500" />
            <strong className="ml-2">Students</strong>
          </div>

          <div className="flex items-center">
            <Modal
              title="New student"
              button={
                <Button className="flex items-center ml-3 justify-between">
                  <UserPlus />
                  <span>New Student</span>
                </Button>
              }
            >
              <ReusableStudentForm />
            </Modal>
          </div>
        </div>

        <StudentsTable student_data={student} />
      </div>
    </div>
  );
}
