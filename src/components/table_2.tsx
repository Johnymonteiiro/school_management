"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/static/student";

// Dados dos estudantes
const data: Student[] = [
  {
    nome: "Ana Silva",
    classe: "10A",
    ano: "Primeiro ano",
    matricula: "STU001",
    status: "Ativo",
  },
  {
    nome: "Carlos Souza",
    classe: "9B",
    ano: "Segundo ano",
    matricula: "STU002",
    status: "Inativo",
  },
  {
    nome: "Mariana Oliveira",
    classe: "11C",
    ano: "Terceiro ano",
    matricula: "STU003",
    status: "Ativo",
  },
  {
    nome: "João Ferreira",
    classe: "12A",
    ano: "Quarto ano",
    matricula: "STU004",
    status: "Ativo",
  },
  {
    nome: "Beatriz Santos",
    classe: "8D",
    ano: "Primeiro ano",
    matricula: "STU005",
    status: "Inativo",
  },
  {
    nome: "Lucas Almeida",
    classe: "7E",
    ano: "Segundo ano",
    matricula: "STU006",
    status: "Ativo",
  },
  {
    nome: "Fernanda Costa",
    classe: "6F",
    ano: "Terceiro ano",
    matricula: "STU007",
    status: "Ativo",
  },
  {
    nome: "Gabriel Mendes",
    classe: "10B",
    ano: "Primeiro ano",
    matricula: "STU008",
    status: "Ativo",
  },
  {
    nome: "Sofia Rocha",
    classe: "9A",
    ano: "Segundo ano",
    matricula: "STU009",
    status: "Inativo",
  },
  {
    nome: "Miguel Farias",
    classe: "11B",
    ano: "Terceiro ano",
    matricula: "STU010",
    status: "Ativo",
  },
  {
    nome: "Laura Nogueira",
    classe: "12C",
    ano: "Quarto ano",
    matricula: "STU011",
    status: "Ativo",
  },
  {
    nome: "Pedro Gomes",
    classe: "8A",
    ano: "Primeiro ano",
    matricula: "STU012",
    status: "Ativo",
  },
  {
    nome: "Julia Martins",
    classe: "7C",
    ano: "Segundo ano",
    matricula: "STU013",
    status: "Inativo",
  },
  {
    nome: "Rafael Batista",
    classe: "6D",
    ano: "Terceiro ano",
    matricula: "STU014",
    status: "Ativo",
  },
  {
    nome: "Isabela Lima",
    classe: "9C",
    ano: "Segundo ano",
    matricula: "STU015",
    status: "Ativo",
  },
  {
    nome: "Thiago Ribeiro",
    classe: "8B",
    ano: "Primeiro ano",
    matricula: "STU016",
    status: "Inativo",
  },
  {
    nome: "Clara Antunes",
    classe: "11A",
    ano: "Terceiro ano",
    matricula: "STU017",
    status: "Ativo",
  },
];

// Colunas da tabela
export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "classe",
    header: "Classe",
    cell: ({ row }) => <div>{row.getValue("classe")}</div>,
  },
  {
    accessorKey: "ano",
    header: "Ano",
    cell: ({ row }) => <div>{row.getValue("ano")}</div>,
  },
  {
    accessorKey: "matricula",
    header: "Matrícula",
    cell: ({ row }) => <div>{row.getValue("matricula")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
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
          <DropdownMenuItem
            onClick={() => console.log("Visualizar", row.original)}
          >
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => console.log("Excluir", row.original)}
            className="text-red-600"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
