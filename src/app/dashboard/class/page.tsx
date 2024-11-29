"use client";

import { LibraryBig, UserPlus } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableClassForm } from "./create-class";
import TeachersTable from "./class-table";

export default function Teachers() {

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
              title="New Class"
              button={{
                icon: LibraryBig,
                label: "New class",
              }}
            >
              <ReusableClassForm />
            </Modal>
          </div>
        </div>

        <TeachersTable />
      </div>
    </div>
  );
}
