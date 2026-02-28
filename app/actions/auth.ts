"use server";

import { signIn, signOut } from "@/auth";

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function loginAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/projects",
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "type" in error) {
      if (error.type === "CredentialsSignin") {
        return "Invalid credentials.";
      }
    }
    throw error;
  }
}
