"use client";

import { useState } from "react";
import { DataTable } from "@/components/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, UserRoundPen, Trash } from "lucide-react";
import { Modal } from "@/components/modal";
import { DeleteForm } from "./delete";
import { StudentsTypes } from "./page";
import { EditStudentForm } from "./edit";

export const StudentsTable = ({ student_data }: { student_data: StudentsTypes[] }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const openModal = (id: number, type: "edit" | "delete") => {
    console.log("Abrindo modal com ID:", id); // Para depuração
    setSelectedId(id);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalType(null);
  };

  const studentColumns: ColumnDef<StudentsTypes>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todas"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id_aluno",
      header: "ID",
    },
    {
      accessorKey: "nome",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.nome}</div>,
    },
    {
      accessorKey: "genero",
      header: "Género",
    },
    {
      accessorKey: "serie",
      header: "Serie",
    },
    {
      accessorKey: "matricula",
      header: "Matrícula",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`${
            row.original.status === "Ativo"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } p-1 rounded-full text-center`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Button
              onClick={() => openModal(row.original.id_aluno, "edit")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <UserRoundPen className="stroke-green-500" />
              <span>Edit</span>
            </Button>
            <DropdownMenuSeparator />
            <Button
              onClick={() => openModal(row.original.id_aluno, "delete")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <Trash className="stroke-red-500" />
              <span>Delete</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={student_data}
        columns={studentColumns}
        filterPlaceholder="Filtrar por nome..."
      />

      {modalType === "edit" && selectedId !== null && (
        <Modal title="Edit student" isOpen={true} onClose={closeModal}>
          <EditStudentForm id_aluno={selectedId} />
        </Modal>
      )}

      {modalType === "delete" && selectedId !== null && (
        <Modal
          title="Excluir aluno"
          isOpen={true}
          onClose={closeModal}
          w="max-w-[500px]"
        >
          <DeleteForm id_aluno={selectedId} />
        </Modal>
      )}
    </>
  );
};

