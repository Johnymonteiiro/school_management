import { LibraryBig } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableClassForm } from "./create-class";
import { TurmasTable } from "./class-table";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

export interface TurmaType {
  ano_letivo: number;
  capacidade: number;
  id_turma: number;
  nome: string;
  semestre: string;
  serie: string;
}

export default async function Teachers() {
  const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/turmas`);

  const class_data: TurmaType[] = await data.json();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <LibraryBig className="stroke-blue-500" />
            <strong className="ml-2">Class</strong>
          </div>

          <div className="flex items-center">
            <Modal
              button={
                <Button className="flex items-center ml-3 justify-between">
                  <LibraryBig />
                  <span>Add new class</span>
                </Button>
              }
            >
              <ReusableClassForm />
            </Modal>
          </div>
        </div>

        <TurmasTable turma_data={class_data} />
      </div>
    </div>
  );
}
