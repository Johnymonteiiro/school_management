"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env";
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
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Gerenciar Tabelas</h1>
        </div>

        <div className="flex items-center">
          <div className="flex gap-4 mt-4">
            <Button onClick={createTable}>Create Tables</Button>
          </div>

          <div className="flex gap-4 mt-4">
            <Button className=" bg-red-500 ml-4" onClick={dropTable}>
              Drop Tables
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
