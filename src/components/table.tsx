import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MenuOptions } from "./menu-options";

const students = [
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
];

export function TableContent() {
  return (
    <Table className="border bg-slate-50">
      <TableCaption>Current students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Class</TableHead>
          <TableHead className="text-center">Ano</TableHead>
          <TableHead className="w-[100px] text-center">Status</TableHead>
          <TableHead className="w-[200px] text-center">Matrícula</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.nome}>
            <TableCell className="font-medium">{student.nome}</TableCell>
            <TableCell className="text-center">{student.classe}</TableCell>
            <TableCell className="text-center">{student.ano}</TableCell>
            <TableCell className="text-center">
              <p
                className={`${
                  student.status === "Ativo"
                    ? "bg-green-100 text-green-800"
                    : "text-red-800 bg-red-100"
                } p-1 rounded-full`}
              >
                {student.status}
              </p>
            </TableCell>
            <TableCell className="text-center">{student.matricula}</TableCell>
            <TableCell className="text-center">
              <MenuOptions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
