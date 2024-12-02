"use client";

import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { InputField } from "@/components/inputField";
import { createDiscipline } from "@/app/actions";
import { toast } from "sonner";

const disciplinaSchema = z.object({
  nome: z.string().min(1, "O nome da disciplina é obrigatório."),
  codigo: z
    .string()
    .min(1, "O código da disciplina é obrigatório.")
    .max(10, "O código deve ter no máximo 10 caracteres.")
    .regex(
      /^[A-Z]{3}\d{3}$/,
      "O código deve estar no formato XXX000 (Ex: MAT001)."
    ),
  descricao: z
    .string()
    .min(1, "A descrição é obrigatória.")
    .max(255, "A descrição deve ter no máximo 255 caracteres."),
  carga_horaria: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "A carga horária deve ser um número válido.",
    })
    .transform((val) => Number(val))
    .refine((num) => num >= 1, {
      message: "A carga horária deve ser pelo menos 1 hora.",
    })
    .refine((num) => num <= 200, {
      message: "A carga horária deve ser no máximo 200 horas.",
    }),
});

export type DisciplinaFormData = z.infer<typeof disciplinaSchema>;

export function ReusableDisciplinaForm() {
  const methods = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: "",
      codigo: "",
      descricao: "",
      carga_horaria: 0,
    },
  });

  const { handleSubmit, formState, reset } = methods;

  const handleFormSubmit = async (data: DisciplinaFormData) => {
    try {
      const res = await createDiscipline(data);

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
            id="nome"
            label="Nome da Disciplina"
            placeholder="Ex.: Matemática"
          />
          <InputField id="codigo" label="Código" placeholder="Ex.: MAT101" />

          <InputField
            id="descricao"
            label="Descrição"
            placeholder="Ex.: Disciplina focada em álgebra e geometria"
          />

          <InputField
            id="carga_horaria"
            label="Carga Horária"
            placeholder="Ex.: 60"
          />
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
