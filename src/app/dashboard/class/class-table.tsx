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
import { MoreHorizontal, ArrowUpDown, Edit, Trash, LibraryBig } from "lucide-react";
import { Modal } from "@/components/modal";
import { TurmaType } from "./page";
import { useRouter } from "next/navigation";

export const TurmasTable = ({ turma_data }: { turma_data: TurmaType[] }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
    const [name_class, setNameClass] = useState<string | null>(null);
  const [modalType, setModalType] = useState<
    "edit" | "delete" | "access" | null
  >(null);

  const openModal = (
    id: number,
    type: "edit" | "delete" | "access",
    name?: string
  ) => {
    console.log("Abrindo modal com ID:", id);
    setSelectedId(id);
    setModalType(type);
    setNameClass(name!);
  };

  const closeModal = () => {
    setSelectedId(null);
    setModalType(null);
  };

  const router = useRouter();

  const turmaColumns: ColumnDef<TurmaType>[] = [
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
      accessorKey: "id_turma",
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
      accessorKey: "capacidade",
      header: "Capacidade",
    },
    {
      accessorKey: "serie",
      header: "Série",
    },
    {
      accessorKey: "ano_letivo",
      header: "Ano Letivo",
    },
    {
      accessorKey: "semestre",
      header: "Semestre",
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
              onClick={() => openModal(row.original.id_turma, "edit")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <Edit className="stroke-green-500" />
              <span>Edit class</span>
            </Button>
            <DropdownMenuSeparator />
            <Button
              onClick={() =>
                router.push(
                  `/dashboard/class/info/${row.original.id_turma}/${row.original.nome}`
                )
              }
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <LibraryBig className="stroke-blue-500" />
              <span>Access the class</span>
            </Button>
            <DropdownMenuSeparator />
            <Button
              onClick={() => openModal(row.original.id_turma, "delete")}
              variant="ghost"
              className="flex justify-start w-full text-left"
            >
              <Trash className="stroke-red-500" />
              <span>Delete class</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={turma_data}
        columns={turmaColumns}
        filterPlaceholder="Filtrar por nome da turma..."
      />

      {modalType === "edit" && selectedId !== null && (
        <Modal title="Editar Turma" isOpen={true} onClose={closeModal}>
          <h1>Editar funcionalidade aqui</h1>
        </Modal>
      )}

      {modalType === "access" && selectedId !== null && (
        <Modal
          title={`Turma: ${name_class}`}
          isOpen={true}
          onClose={closeModal}
        >
          <h1>Editar funcionalidade aqui</h1>
        </Modal>
      )}

      {modalType === "delete" && selectedId !== null && (
        <Modal
          title="Excluir Turma"
          isOpen={true}
          onClose={closeModal}
          w="max-w-[500px]"
        >
          <h1>Excluir funcionalidade aqui</h1>
        </Modal>
      )}
    </>
  );
};
