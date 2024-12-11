"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import { DeleteStudent } from "@/app/actions";

export function DeleteForm({ id_aluno }: { id_aluno: number }) {
  const handleFormSubmit = async () => {
    try {
      const res = await DeleteStudent(`alunos/${id_aluno}`);

      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to create student.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full items-center mb-10">
      <div className="flex flex-col justify-center items-center">
        <CircleAlert size={30} className="stroke-red-500" />
        <h2 className="m-4">Are you sure?</h2>
      </div>
      <div className="flex items-center justify-center mt-5">
        <DialogClose  className="px-2 py-2 bg-blue-500 text-md text-white rounded-md">
          Cancel
        </DialogClose>
        <Button
          onClick={handleFormSubmit}
          className="px-4 py-4 ml-4 text-sm font-medium text-md text-zinc-100 bg-red-500 rounded-md"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
