"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import { GetProfile, UpdateProfessor } from "@/app/actions";
import { toast } from "sonner";

const professorSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome é obrigatório e deve ter pelo menos 3 caracteres."),
  genero: z.string().min(1, "O gênero é obrigatório."),
  especialidade: z.string().min(1, "A especialidade é obrigatória."),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido. Use o formato 000.000.000-00."
    ),
  email: z
    .string()
    .email("E-mail inválido.")
    .max(100, "O e-mail não pode exceder 100 caracteres."),
  endereco: z.string().min(5, "Endereço é obrigatório."),
  status: z.string().min(5, "O status é obrigatório."),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone inválido. Use o formato (99) 99999-9999."
    ),
});

export type ProfessorFormData = z.infer<typeof professorSchema>;

type ResponseData = {
  cpf: string;
  especialidade: string;
  endereco: string;
  genero: "Masculino" | "Feminino";
  nome: string;
  email:string;
  telefone: string;
};

export function EditProfessorForm({ id_professor }: { id_professor: number }) {
  const [defaultValues, setDefaultValues] = useState<ProfessorFormData>();

  useEffect(() => {
    async function fetchData() {
      const data: ResponseData = await GetProfile(
        `professores/${id_professor}`
      );

      setDefaultValues({
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        genero: data.genero,
        endereco: data.endereco,
        telefone: data.telefone,
        especialidade: data.especialidade,
        status: "Ativo",
      });
    }
    fetchData();
  }, [id_professor]);


  const methods = useForm<ProfessorFormData>({
    resolver: zodResolver(professorSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, formState } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: ProfessorFormData) => {
    try {
      const res = await UpdateProfessor(data, id_professor);

      if (res.status === 201) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message || "Falha ao salvar os dados.");
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
            label="Nome do Professor"
            placeholder="Nome do Professor"
          />
          <div className="flex flex-col w-full ml-1">
            <label htmlFor="genero" className="mb-2 text-base">
              Gênero <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("genero", value, { shouldValidate: true })
              }
              placeholder="Selecione o gênero"
              items={[{ value: "Masculino" }, { value: "Feminino" }]}
            />
            {formState.errors.genero && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.genero.message}
              </span>
            )}
          </div>
          <InputMask
            id="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            mask="999.999.999-99"
          />
          <InputField id="email" label="Email" placeholder="email" />
          <InputField
            id="especialidade"
            label="Especialidade"
            placeholder="Digite a especialidade"
          />
          <InputField
            id="endereco"
            label="Endereço"
            placeholder="Endereço do Professor"
          />
          <InputMask
            id="telefone"
            label="Telefone"
            placeholder="(99) 99999-9999"
            mask="(99) 99999-9999"
          />
          <div className="flex flex-col w-full ml-1">
            <label htmlFor="status" className="mb-2 text-base">
              Status <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("status", value, { shouldValidate: true })
              }
              placeholder="Selecione o status"
              items={[{ value: "Ativo" }, { value: "Inativo" }]}
            />
            {formState.errors.status && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.status.message}
              </span>
            )}
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
