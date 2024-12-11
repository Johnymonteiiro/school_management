"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import { classSchema } from "./schemma.validate";
import { createClass, GetData } from "@/app/actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type classFormData = z.infer<typeof classSchema>;

type ProfessorType = {
  nome: string;
  id: number;
};

type DisciplinaType = {
  nome: string;
  id_disciplina: number;
};

export function ReusableClassForm() {
  const methods = useForm<classFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      capacidade: 0,
      serie: "",
      ano_letivo: "",
      semestre: "",
      id_professor: undefined,
      id_disciplina: undefined,
    },
  });

  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinaType[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const professoresRes = await GetData("professores");

        const profs = professoresRes
          .filter((prof:any) => prof.id_professor) // Ignorar professores sem ID
          .map((prof:any) => ({
            nome: prof.nome,
            id: prof.id_professor,
          }));

        setProfessores(profs);

        const disciplinasRes = await GetData("disciplinas");
  
        const disc = disciplinasRes
          .filter((disc : any) => disc.id_disciplina) // Ignorar disciplinas sem ID
          .map((disc: any) => ({
            nome: disc.nome_disciplina,
            id_disciplina: disc.id_disciplina,
          }));

        setDisciplinas(disc);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const { handleSubmit, setValue, formState, reset } = methods;

  const handleFormSubmit = async (data: classFormData) => {
    try {
      const res = await createClass(data);
      if (res.status === 201) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message || "Falha ao cadastrar a disciplina.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-full items-center mb-10">
          <InputField
            id="capacidade"
            label="Capacidade da turma"
            placeholder="20"
          />
          <InputMask
            id="ano_letivo"
            label="Ano letivo"
            placeholder="2024"
            mask="9999"
          />
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="ano" className="mb-2 text-base">
              Série <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("serie", value, { shouldValidate: true })
              }
              placeholder="Selecione a série"
              items={[
                { value: "Primeira" },
                { value: "Segunda" },
                { value: "Terceira" },
              ]}
            />
            {formState.errors.serie && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.serie.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="semestre" className="mb-2 text-base">
              Semestre <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("semestre", value, { shouldValidate: true })
              }
              placeholder="Selecione o semestre"
              items={[{ value: "Primeiro" }, { value: "Segundo" }]}
            />
            {formState.errors.semestre && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.semestre.message}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* Select para Professores */}
            <Select onValueChange={(value) => setValue("id_professor", Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione um professor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Professores</SelectLabel>
                  {professores.map((professor, index) => (
                    <SelectItem
                      key={professor.id || `professor-${index}`}
                      value={String(professor.id || index)}
                    >
                      {professor.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => setValue("id_disciplina", Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Disciplinas</SelectLabel>
                  {disciplinas.map((disciplina, index) => (
                    <SelectItem
                      key={disciplina.id_disciplina || `disciplina-${index}`}
                      value={String(disciplina.id_disciplina || index)}
                    >
                      {disciplina.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose className="px-4 py-2 text-sm font-medium text-zinc-100 bg-red-500 rounded-md">
            Cancelar
          </DialogClose>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
