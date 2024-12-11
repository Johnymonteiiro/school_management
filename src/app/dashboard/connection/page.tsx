"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export default function Conection() {
  const createTable = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/setup-database`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Tabelas criadas com sucesso!");
      } else {
        console.error("Erro ao criar tabelas:", result.message);
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro inesperado ao criar tabelas.");
    }
  };

  const dropTable = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/drop-tables`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Tabelas deletadas com sucesso!");
      } else {
        console.error("Erro ao criar tabelas:", result.message);
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro inesperado ao criar tabelas.");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-[980px] relative top-40">
        <div>
          <h2>Create new tables</h2>

          <div className="flex items-center rounded border p-6 mt-5">
            <div className="flex">
              <strong className="flex mr-2 text-orange-400">
                <CircleAlert className="mr-2" />
                Warning:
              </strong>
              <p className="text-zinc-500">
                This action will create new tables into database and generate
                automatically new datas. Before creating new tables, ensure that
                no existing tables are present in the same database. It is
                recommended to use a{" "}
                <span className="italic font-medium text-red-500">
                  DROP Tables{" "}
                </span>{" "}
                in section below before proceeding.
              </p>
            </div>

            <Button
              onClick={createTable}
              className="ml-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
            >
              Create new tables
            </Button>
          </div>
        </div>

        <div className="mt-20">
          <h2>Drop all tables</h2>

          <div className="flex items-center rounded border border-red-500 p-6 mt-5">
            <div className=" flex">
              <strong className="flex mr-2 text-red-500">
                <TriangleAlert className="mr-2" />
                Warning:
              </strong>
              <p className="text-gray-700">
                Warning: This action will remove all existing tables from the
                database,
                <span className="italic font-medium text-red-500">
                  resulting in permanent data loss
                </span>
                . Ensure you have backed up any necessary information before
                proceeding. Once dropped, the tables cannot be recovered.
              </p>
            </div>
            <Button
              onClick={dropTable}
              className="ml-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
            >
              Drop all Tables
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
