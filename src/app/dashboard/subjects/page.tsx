"use client";

import { Book } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableSubjectsForm } from "./create-class";
import SubjectsTable from "./subjects-table";

export default function Subjects() {

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
              button={{
                icon: Book,
                label: "New subject",
              }}
            >
              <ReusableSubjectsForm />
            </Modal>
          </div>
        </div>

        <SubjectsTable />
      </div>
    </div>
  );
}
