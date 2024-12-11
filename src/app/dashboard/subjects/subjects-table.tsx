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
import { MoreHorizontal, ArrowUpDown, Edit, Trash } from "lucide-react";
import { DisciplinaType } from "./page";


export const DisciplinasTable = ({
  disciplina_data,
}: {
  disciplina_data: DisciplinaType[];
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const openModal = (id: number, type: "edit" | "delete") => {
    console.log("Abrindo modal com ID:", id);
    setSelectedId(id);
    setModalType(type);
  };

  const disciplinaColumns: ColumnDef<DisciplinaType>[] = [
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
      accessorKey: "id_disciplina",
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
      accessorKey: "codigo",
      header: "Código",
    },
    {
      accessorKey: "carga_horaria",
      header: "Carga Horária",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
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
              onClick={() => openModal(row.original.id_disciplina, "edit")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <Edit className="stroke-green-500" />
              <span>Editar</span>
            </Button>
            <DropdownMenuSeparator />
            <Button
              onClick={() => openModal(row.original.id_disciplina, "delete")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <Trash className="stroke-red-500" />
              <span>Excluir</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={disciplina_data}
        columns={disciplinaColumns}
        filterPlaceholder="Filtrar por nome da disciplina..."
      />

      {modalType === "edit" && selectedId !== null && (
        // <Modal title="Editar Disciplina" isOpen={true} onClose={closeModal}>
        //   <EditDisciplinaForm id_disciplina={selectedId} />
        // </Modal>
        <h1></h1>
      )}

      {modalType === "delete" && selectedId !== null && (
        // <Modal
        //   title="Excluir Disciplina"
        //   isOpen={true}
        //   onClose={closeModal}
        //   w="max-w-[500px]"
        // >
        //   <DeleteForm id_disciplina={selectedId} />
        // </Modal>
        <h1></h1>
      )}
    </>
  );
};
