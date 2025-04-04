"use client";

import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import { createteacher } from "@/app/actions";
import { toast } from "sonner";


const teacherSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome é obrigatório e deve ter pelo menos 3 caracteres.")
    .max(100, "O nome não pode exceder 100 caracteres."),
  genero: z.string().min(1, "O gênero é obrigatório."),
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
  especialidade: z.string().min(1, "A especialidade é obrigatória."),
  endereco: z
    .string()
    .min(5, "Endereço é obrigatório e deve conter pelo menos 5 caracteres.")
    .max(200, "O endereço não pode exceder 200 caracteres."),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone inválido. Use o formato (99) 99999-9999."
    )
});

export type teacherFormData = z.infer<typeof teacherSchema>;

export function ReusableTeacherForm() {
  const methods = useForm<teacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      genero: "",
      email: "",
      endereco: "",
      especialidade: "",
      telefone: "",
    },
  });

  const { handleSubmit, reset, setValue, formState } = methods;

  const handleFormSubmit = async (data: teacherFormData) => {
    try {
      const res = await createteacher(data);

      if (res.status === 201) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message || "Falha ao criar o professor.");
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
            placeholder="Digite o nome"
          />
          <div className="flex flex-col w-full">
            <label htmlFor="genero" className="mb-2 text-base">
              Gênero <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("genero", value, { shouldValidate: true })
              }
              placeholder="Selecione o gênero"
              items={[{ value: "Masculino" }, { value: "Femenino" }]}
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
          <InputField
            id="email"
            label="Email"
            placeholder="email"
          />
          <InputField
            id="endereco"
            label="Endereço"
            placeholder="Digite o endereço"
          />
          <InputField
            id="especialidade"
            label="Especialidade"
            placeholder="Digite a especialidade"
          />
          <InputMask
            id="telefone"
            label="Telefone"
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
