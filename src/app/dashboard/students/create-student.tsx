"use client";

import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DatePicker } from "@/components/calendar_data";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import { format } from "date-fns";

const studentSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome é obrigatório e deve ter pelo menos 3 caracteres."),
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
  ano: z.string().min(1, "Ano é obrigatório."),
  endereco: z.string().min(5, "Endereço é obrigatório."),
  nomeResponsavel: z.string().min(3, "Nome do responsável é obrigatório."),
  telefoneResponsavel: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone inválido. Use o formato (99) 99999-9999."
    ),
});

export type StudentFormData = z.infer<typeof studentSchema>;

export function ReusableStudentForm() {
  const methods = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      dataNascimento: undefined,
      ano: "",
      endereco: "",
      nomeResponsavel: "",
      telefoneResponsavel: "",
    },
  });

  const { handleSubmit, reset, watch, setValue, formState } = methods;

  const handleFormSubmit = (data: StudentFormData) => {
    const formattedData = {
      dataNascimento: format(data.dataNascimento, "dd-MM-yyyy"),
    };
    console.log("Dados enviados: ", data);
    reset();
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
            <div className="flex flex-col w-full ml-1">
              <label htmlFor="ano" className="mb-2 text-base">
                Ano <span className="text-red-500">*</span>
              </label>
              <SelectOptions
                onValueChange={(value) =>
                  setValue("ano", value, { shouldValidate: true })
                }
                placeholder="Selecione o ano"
                items={[
                  {
                    value: "Primeiro ano",
                  },
                  {
                    value: "Segundo ano",
                  },
                  {
                    value: "Terceiro ano",
                  },
                ]}
              />
              {formState.errors.ano && (
                <span className="text-red-500 pt-1 text-xs">
                  {formState.errors.ano.message}
                </span>
              )}
            </div>
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
