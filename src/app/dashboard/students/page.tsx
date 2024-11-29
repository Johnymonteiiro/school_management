import { SearchForm } from "@/components/search-form";
import { UserPlus, GraduationCap } from "lucide-react";
import { Modal } from "../../../components/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TableContent } from "@/components/table";
import { DataTableDemo } from "@/components/table_2";
import { ReusableStudentForm } from "./create-student";

export default function Students() {
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
              button={{
                icon: UserPlus,
                label: "New Student",
              }}
            >
              <ReusableStudentForm />
            </Modal>
          </div>
        </div>

        <DataTableDemo />
      </div>
    </div>
  );
}
