export type Teacher = {
  nome: string;
  classe: string;
  ano: string;
  matricula: string;
  status: "Ativo" | "Inativo";
};


export const teacher_data = [
  {
    nome: "Ana Silva",
    especializacao: "Matemática",
    turno: "Matutino",
    matricula: "PROF001",
    email: "ana.silva@escola.com",
    telefone: "(11) 98765-4321",
    turmas: ["10A", "11B"],
    status: "Ativo",
  },
  {
    nome: "João Oliveira",
    especializacao: "História",
    turno: "Vespertino",
    matricula: "PROF002",
    email: "joao.oliveira@escola.com",
    telefone: "(21) 92345-6789",
    turmas: ["12C", "13D"],
    status: "Ativo",
  },
  {
    nome: "Maria Pereira",
    especializacao: "Química",
    turno: "Noturno",
    matricula: "PROF003",
    email: "maria.pereira@escola.com",
    telefone: "(31) 91234-5678",
    turmas: ["10B", "11C"],
    status: "Inativo",
  },
  {
    nome: "Carlos Souza",
    especializacao: "Física",
    turno: "Matutino",
    matricula: "PROF004",
    email: "carlos.souza@escola.com",
    telefone: "(41) 97654-3210",
    turmas: ["10A", "10C"],
    status: "Ativo",
  },
  {
    nome: "Paula Rodrigues",
    especializacao: "Biologia",
    turno: "Vespertino",
    matricula: "PROF005",
    email: "paula.rodrigues@escola.com",
    telefone: "(51) 99876-5432",
    turmas: ["11A", "12B"],
    status: "Ativo",
  },
  {
    nome: "Fernando Lima",
    especializacao: "Português",
    turno: "Noturno",
    matricula: "PROF006",
    email: "fernando.lima@escola.com",
    telefone: "(61) 93456-7890",
    turmas: ["10D", "11E"],
    status: "Ativo",
  },
  {
    nome: "Beatriz Mendes",
    especializacao: "Geografia",
    turno: "Matutino",
    matricula: "PROF007",
    email: "beatriz.mendes@escola.com",
    telefone: "(71) 91234-5678",
    turmas: ["10A", "11B"],
    status: "Inativo",
  },
  {
    nome: "Ricardo Almeida",
    especializacao: "Inglês",
    turno: "Vespertino",
    matricula: "PROF008",
    email: "ricardo.almeida@escola.com",
    telefone: "(81) 92345-6789",
    turmas: ["12C", "13D"],
    status: "Ativo",
  },
];
