"use server";

import { env } from "@/env";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { FormData } from "./auth/login/page";
import { StudentFormData } from "./dashboard/students/create-student";
import { StudentFormData as EditForm } from "./dashboard/students/edit";
import { classFormData } from "./dashboard/class/create-class";
import { teacherFormData } from "./dashboard/teachers/create-teacher";
import { ProfessorFormData } from "./dashboard/teachers/edit";
import { DisciplinaFormData } from "./dashboard/subjects/create-suject";

const testUser = {
  email: "johnDoe@gmail.com",
  password: "12345678",
};

export const Signup = async (value: FormData) => {
  const { email, password } = value;
  const cookieStore = await cookies();

  if (email !== testUser.email || password !== testUser.password) {
    return { status: 400, message: "Invalid credentials" };
  } else {
    const user = { email, token_test: "fake_token_example" };
    cookieStore.set("token_test", JSON.stringify(user));
  }
};

export async function createStudent(formData: StudentFormData) {
  try {
    const {
      serie,
      cpf,
      dataNascimento,
      endereco,
      nome,
      nomeResponsavel,
      telefoneResponsavel,
      genero,
    } = formData;

    const formattedData = {
      data_nascimento: format(dataNascimento, "yyyy-MM-dd"),
      genero,
      cpf,
      serie,
      endereco,
      nome_responsavel: nomeResponsavel,
      telefone_responsavel: telefoneResponsavel,
    };

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/alunos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        ...formattedData,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Error adding new student",
        status: res.status,
      };
    }

    revalidatePath("/dashboard");

    return { message: "Student created", status: 201 };
  } catch (error) {
    console.error("Error creating student:", error);

    return {
      message: "An unexpected error occurred while creating the student.",
      status: 500,
    };
  }
}

export async function UpdateStudent(formData: EditForm, id_aluno: number) {
  try {
    const {
      cpf,
      dataNascimento,
      endereco,
      nome,
      status,
      nomeResponsavel,
      telefoneResponsavel,
      genero,
    } = formData;

    const formattedData = {
      data_nascimento: format(dataNascimento, "yyyy-MM-dd"),
      genero,
      cpf,
      endereco,
      status,
      nome_responsavel: nomeResponsavel,
      telefone_responsavel: telefoneResponsavel,
    };

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/alunos/${id_aluno}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        ...formattedData,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Error adding new student",
        status: res.status,
      };
    }

    revalidatePath("/dashboard");

    return { message: "Student updated!", status: 201 };
  } catch (error) {
    console.error("Error creating student:", error);

    return {
      message: "An unexpected error occurred while creating the student.",
      status: 500,
    };
  }
}

export async function DeleteStudent(path: string) {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/${path}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Error to delete student",
        status: res.status,
      };
    }

    revalidatePath("/dashboard");

    return { message: "Student deleted", status: 200 };
  } catch (error) {
    console.error("Error deleting student:", error);

    return {
      message: "An unexpected error occurred while deleting the student.",
      status: 500,
    };
  }
}

export async function GetProfile(path: string) {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/${path}`;

    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error("Error deleting student:", error);

    return {
      message: "An unexpected error occurred while deleting the student.",
      status: 500,
    };
  }
}

export async function GetData(path: string) {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/${path}`;

    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error("Error deleting student:", error);

    return {
      message: "An unexpected error occurred while deleting the student.",
      status: 500,
    };
  }
}

export async function createteacher(formData: teacherFormData) {
  try {
    const { nome, cpf, genero, email, especialidade, endereco, telefone } =
      formData;

    const formattedData = {
      nome,
      cpf,
      genero,
      email,
      especialidade,
      endereco,
      telefone,
    };

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/professores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Erro ao criar professor",
        status: res.status,
      };
    }

    revalidatePath("dashboard/teachers");

    return { message: "Professor criado com sucesso", status: 201 };
  } catch (error) {
    console.error("Erro ao criar professor:", error);

    return {
      message: "Ocorreu um erro inesperado ao criar o professor.",
      status: 500,
    };
  }
}

export async function UpdateProfessor(
  formData: ProfessorFormData,
  id_professor: number
) {
  try {
    const {
      cpf,
      endereco,
      nome,
      telefone,
      genero,
      status,
      email,
      especialidade,
    } = formData;

    const formattedData = {
      cpf,
      endereco,
      telefone,
      genero,
      status,
      email,
      especialidade,
    };

    console.log("Form", formattedData);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/professores/${id_professor}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          ...formattedData,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Erro ao atualizar o professor.",
        status: res.status,
      };
    }

    revalidatePath("/dashboard/teachers");

    return { message: "Professor atualizado com sucesso!", status: 201 };
  } catch (error) {
    console.error("Erro ao atualizar o professor:", error);

    return {
      message: "Ocorreu um erro inesperado ao atualizar o professor.",
      status: 500,
    };
  }
}

export async function DeleteProfessor(path: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Erro ao deletar o professor.",
        status: res.status,
      };
    }

    revalidatePath("/dashboard/teachers");

    return { message: "Professor deletado com sucesso.", status: 200 };
  } catch (error) {
    console.error("Erro ao deletar o professor:", error);

    return {
      message: "Ocorreu um erro inesperado ao deletar o professor.",
      status: 500,
    };
  }
}

export async function createClass(formData: classFormData) {
  try {
    const { ano_letivo, capacidade, semestre, serie,id_disciplina,id_professor } = formData;

    const newdata = {
      serie,
      ano_letivo,
      semestre,
      fk_professor: id_professor,
      fk_disciplina:id_disciplina,
    }

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/turmas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        capacidade,
        ...newdata
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Error adding new student",
        status: res.status,
      };
    }

    revalidatePath("/dashboard");

    return { message: "Student created", status: 201 };
  } catch (error) {
    console.error("Error creating student:", error);

    return {
      message: "An unexpected error occurred while creating the student.",
      status: 500,
    };
  }
}

export async function createDiscipline(formData: DisciplinaFormData) {
  try {
    const { nome, codigo, descricao, carga_horaria } = formData;

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/disciplinas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        codigo,
        descricao,
        carga:carga_horaria,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Erro ao cadastrar a disciplina",
        status: res.status,
      };
    }

    revalidatePath("/dashboard/subject");

    return { message: "Disciplina cadastrada com sucesso", status: 201 };
  } catch (error) {
    console.error("Erro ao cadastrar disciplina:", error);

    return {
      message: "Ocorreu um erro inesperado ao cadastrar a disciplina.",
      status: 500,
    };
  }
}

export async function addStudentClass(id_aluno: number, id_turma:number) {
  try {
    
     const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/cadastrar_aluno_turma`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_aluno,
        id_turma,
      }),
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      return {
        message: error?.message || "Error adding new student to this class",
        status: 201,
      };
    }

    revalidatePath("/dashboard/class/info");

    return { message: "Student add", status: 201 };
  } catch (error) {
    console.error("Error add student:", error);

    return {
      message: "An unexpected error occurred while creating the student.",
      status: 500,
    };
  }
}