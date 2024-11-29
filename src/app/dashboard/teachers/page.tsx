"use client";

import { GraduationCap, UserPlus, Users } from "lucide-react";
import { Modal } from "../../../components/modal";
import { ReusableTeacherForm } from "./create-teacher";
import TeachersTable from "./teacher-table";

export default function Teachers() {

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
              button={{
                icon: UserPlus,
                label: "New Teacher",
              }}
            >
              <ReusableTeacherForm />
            </Modal>
          </div>
        </div>

        <TeachersTable />
      </div>
    </div>
  );
}
