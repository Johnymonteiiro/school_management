"use client";

import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { InputField, InputMask } from "@/components/inputField";
import { SelectOptions } from "@/components/select-item";
import { classSchema } from "./schemma.validate";


export type classFormData = z.infer<typeof classSchema>;

export function ReusableClassForm() {
  const methods = useForm<classFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      capacidade: 0,
      serie: "",
      ano_letivo:"",
      semestre: "",
    },
  });

  const { handleSubmit, setValue, formState } = methods;

  const handleFormSubmit = (data: classFormData) => {
 
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
            label=" Ano letivo"
            placeholder="2024"
            mask="9999"
          />
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="ano" className="mb-2 text-base">
              Serie <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("serie", value, { shouldValidate: true })
              }
              placeholder="Selecione o a serie"
              items={[
                {
                  value: "Primeira",
                },
                {
                  value: "Segunda",
                },
                {
                  value: "Terceira",
                },
              ]}
            />
            {formState.errors.serie && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.serie.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="ano" className="mb-2 text-base">
              Semestre <span className="text-red-500">*</span>
            </label>
            <SelectOptions
              onValueChange={(value) =>
                setValue("semestre", value, { shouldValidate: true })
              }
              placeholder="Selecione o semestre"
              items={[
                {
                  value: "Primeiro",
                },
                {
                  value: "Segundo",
                },
              ]}
            />
            {formState.errors.semestre && (
              <span className="text-red-500 pt-1 text-xs">
                {formState.errors.semestre.message}
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
