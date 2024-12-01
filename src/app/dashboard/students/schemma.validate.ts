// import { z } from "zod";

// export const studentSchema = z.object({
//   nome: z
//     .string()
//     .min(3, "Nome é obrigatório e deve ter pelo menos 3 caracteres."),
//   cpf: z
//     .string()
//     .regex(
//       /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
//       "CPF inválido. Use o formato 000.000.000-00."
//     ),
//   dataNascimento: z
//     .date()
//     .refine(
//       (date) => date <= new Date(),
//       "Data de nascimento não pode ser no futuro."
//     ),
//   ano: z.string().min(1, "Ano é obrigatório."),
//   endereco: z.string().min(5, "Endereço é obrigatório."),
//   nomeResponsavel: z.string().min(3, "Nome do responsável é obrigatório."),
//   telefoneResponsavel: z
//     .string()
//     .regex(
//       /^\(\d{2}\) \d{4,5}-\d{4}$/,
//       "Telefone inválido. Use o formato (99) 99999-9999."
//     ),
// });
