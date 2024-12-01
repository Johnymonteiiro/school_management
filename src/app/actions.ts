"use server";

import { env } from "@/env";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { formSchema } from "./auth/login/page";
import { StudentFormData } from "./dashboard/students/create-student";
import { StudentFormData as EditForm } from "./dashboard/students/edit";
import { classFormData } from "./dashboard/class/create-class";

const testUser = {
  email: "johnDoe@gmail.com",
  password: "12345678",
};

export const Signup = async (value: z.infer<typeof formSchema>) => {
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
      nomeResponsavel,
      telefoneResponsavel,
      genero,
    } = formData;

    const formattedData = {
      data_nascimento: format(dataNascimento, "yyyy-MM-dd"),
      genero,
      cpf,
      endereco,
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

export async function createClass(formData: classFormData) {
  try {
    const { ano_letivo, capacidade, semestre, serie } = formData;

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/cadastrar_turma`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ano_letivo,
        capacidade,
        semestre,
        serie,
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
