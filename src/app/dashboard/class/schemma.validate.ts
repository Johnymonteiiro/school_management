import { z } from "zod";

export const classSchema = z.object({
  capacidade: z
    .string({
      required_error: "Capacidade é obrigatória.",
    })
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), "Capacidade deve ser um número.")
    .refine((value) => value >= 1, "Capacidade deve ser no mínimo 1."),
  serie: z
    .string({
      required_error: "Série é obrigatória.",
      invalid_type_error: "Série deve ser uma string.",
    })
    .min(1, "Série é obrigatória e não pode estar vazia."),
  ano_letivo: z
    .string({
      required_error: "Ano letivo é obrigatório.",
    })
    .regex(/^\d{4}$/, "Ano letivo deve ser composto por 4 dígitos.")
    .refine(
      (value) => Number(value) >= new Date().getFullYear(),
      "Ano letivo deve ser igual ou posterior ao ano atual."
    ),
  semestre: z
    .string({
      required_error: "Semestre é obrigatório.",
      invalid_type_error: "Semestre deve ser uma string.",
    })
    .min(1, "Semestre é obrigatório e não pode estar vazio."),
});
