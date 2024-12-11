
import { Book } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableDisciplinaForm } from "./create-suject";
import { DisciplinasTable  } from "./subjects-table";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { Disciplina } from "../class/info/[...slug]/page";

export type DisciplinaType = {
  carga_horaria: number;
  codigo: string;
  descricao: string;
  id_disciplina: number;
  nome: string;
};

export default async function Subjects() {
  const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/disciplinas`);

  const subject = await data.json();

    const renamedSubjects: DisciplinaType[] = subject.map((item : Disciplina) => ({
      ...item,
      nome: item.nome_disciplina,
    }));

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Book className="stroke-blue-500" />
            <strong className="ml-2">Subjects</strong>
          </div>

          <div className="flex items-center">
            <Modal
              title="New Subject"
              button={
                <Button className="flex items-center ml-3 justify-between">
                  <Book />
                  <span>Add new subject</span>
                </Button>
              }
            >
              <ReusableDisciplinaForm />
            </Modal>
          </div>
        </div>

        <DisciplinasTable disciplina_data={renamedSubjects} />
      </div>
    </div>
  );
}
