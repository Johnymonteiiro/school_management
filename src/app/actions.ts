"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { formSchema } from "./auth/login/page";

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
