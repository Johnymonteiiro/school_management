"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/calendar_data";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import {  GetProfile, UpdateStudent } from "@/app/actions";
import { toast } from "sonner";

 const studentSchema = z.object({
   nome: z
     .string()
     .min(3, "Nome é obrigatório e deve ter pelo menos 3 caracteres."),
   genero: z.string().min(1, "O gênero é obrigatório."),
   cpf: z
     .string()
     .regex(
       /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
       "CPF inválido. Use o formato 000.000.000-00."
     ),
   dataNascimento: z
     .date()
     .refine(
       (date) => date <= new Date(),
       "Data de nascimento não pode ser no futuro."
     ),
   endereco: z.string().min(5, "Endereço é obrigatório."),
   status: z.string().min(5, "O status é obrigatório."),
   nomeResponsavel: z.string().min(3, "Nome do responsável é obrigatório."),
   telefoneResponsavel: z
     .string()
     .regex(
       /^\(\d{2}\) \d{4,5}-\d{4}$/,
       "Telefone inválido. Use o formato (99) 99999-9999."
     ),
 });

export type StudentFormData = z.infer<typeof studentSchema>;

type ResponseData = {
  cpf: string;
  data_nascimento: string;
  endereco: string;
  genero: "Masculino" | "Feminino";
  nome: string;
  nome_responsavel: string;
  telefone_responsavel: string;
  status:string;
};

export function EditStudentForm({ id_aluno }: { id_aluno: number }) {
  const [defaultValues, setDefaultValues] = useState<StudentFormData>();

  useEffect(() => {
    async function fetchData() {
      const data: ResponseData = await GetProfile(`alunos/${id_aluno}`);
      setDefaultValues({
        nome: data.nome,
        cpf: data.cpf,
        genero: data.genero,
        dataNascimento: new Date(data.data_nascimento), // Converter para Date
        endereco: data.endereco,
        nomeResponsavel: data.nome_responsavel,
        telefoneResponsavel: data.telefone_responsavel,
        status: data.status,
      });
    }
    fetchData();
  }, [id_aluno]);

  const methods = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setValue, formState } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      const res = await UpdateStudent(data, id_aluno);

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
            label="Nome do Estudante"
            placeholder="Nome do Estudante"
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
          <div className="flex">
            <div className="flex flex-col w-full mb-3">
              <label htmlFor="dataNascimento" className="mb-2 text-base">
                Data de Nascimento <span className="text-red-500">*</span>
              </label>
              <DatePicker
                value={watch("dataNascimento")}
                onChange={(selectedDate) =>
                  setValue("dataNascimento", selectedDate!, {
                    shouldValidate: true,
                  })
                }
              />
              {formState.errors.dataNascimento && (
                <span className="text-red-500 pt-1 text-xs">
                  {formState.errors.dataNascimento.message}
                </span>
              )}
            </div>
          </div>
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
          <InputField
            id="endereco"
            label="Endereço"
            placeholder="Endereço do Estudante"
          />
          <InputField
            id="nomeResponsavel"
            label="Nome do Responsável"
            placeholder="Nome do Responsável"
          />
          <InputMask
            id="telefoneResponsavel"
            label="Telefone do Responsável"
            placeholder="(99) 99999-9999"
            mask="(99) 99999-9999"
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
