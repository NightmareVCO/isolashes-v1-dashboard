"use server";

import { signIn, signOut } from "@lib/auth/auth";
import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { toTitleCase } from "@utils/toTitleCase";
import { revalidatePath } from "next/cache";

const handleErrors = (error: any) => {
  const message = error.message;
  if (
    message.includes(
      "user entities failed 'create' check, result is not allowed to be read back",
    )
  ) {
    return { success: "User created successfully" };
  }
  if (message.includes("Unique constraint failed on the fields: (`phone`)")) {
    return {
      error:
        "El número de teléfono ya está en uso. Por favor, intenta con otro.",
    };
  }
  if (message.includes("Unique constraint failed on the fields: (`email`)")) {
    return {
      error:
        "Este correo electrónico ya ha sido registrado. Por favor, intenta con otro.",
    };
  }
  if (message.includes("User already exists")) {
    return {
      error:
        "Este correo electrónico ya ha sido registrado. Por favor, intenta con otro.",
    };
  }
  return { error: `Error creando el usuario` };
};

export const login = async (previousState: any, formData: any) => {
  const { email, password } = Object.fromEntries(formData);
  const lowerCaseEmail = email.toLowerCase().trim();

  try {
    return await signIn("credentials", { email: lowerCaseEmail, password });
  } catch {
    return { error: "Invalid Credentials" };
  }
};

export const register = async (previousState: any, formData: any) => {
  const { name, lastName, phone, email, birthDate, password, role } =
    Object.fromEntries(formData);
  const lowerCaseEmail = email.toLowerCase().trim();
  const formattedName = toTitleCase(name.trim());
  const formattedLastName = toTitleCase(lastName.trim());

  const url = `${process.env.SERVER}/auth/signup`;
  const data = {
    name: formattedName,
    lastName: formattedLastName,
    phone,
    birthDate,
    password,
    email: lowerCaseEmail,
  };

  try {
    const response = await fetchPostRequest({ url, data });
    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    const user = response.data;
    if (!user.roles.includes(role) || role === "CUSTOMER") {
      const url = `${process.env.SERVER}/auth/user/toggle-role/${user.id}`;
      const headers = { "user-id": user.id };
      const data = { role };

      const roleUpdateResponse = await fetchPatchRequest({
        url,
        headers,
        data,
      });
      if (roleUpdateResponse.status === 500)
        return handleErrors(roleUpdateResponse.data);
      if (roleUpdateResponse.error)
        return handleErrors(roleUpdateResponse.data);
    }

    revalidatePath("/dashboard/usuarios");
    return { success: "Usuario creado exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};

export const updateProfile = async (previousState: any, formData: any) => {
  const { name, lastName, phone, email, id, role, isActiveValue } =
    Object.fromEntries(formData);
  const formattedName = toTitleCase(name.trim());
  const formattedLastName = toTitleCase(lastName.trim());

  const url = `${process.env.SERVER}/auth/user/${id}`;
  const data = {
    name: formattedName,
    lastName: formattedLastName,
    phone,
    email,
    status: isActiveValue === "true" ? true : false,
  };
  const headers = { "user-id": id };

  try {
    const response = await fetchPatchRequest({ url, headers, data });
    console.log("response", response);

    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    const user = response.data;
    if (!user.roles.includes(role) || role === "CUSTOMER") {
      const url = `${process.env.SERVER}/auth/user/toggle-role/${id}`;
      const data = { role };
      const roleUpdateResponse = await fetchPatchRequest({
        url,
        headers,
        data,
      });
      if (roleUpdateResponse.status === 500)
        return handleErrors(roleUpdateResponse.data);
      if (roleUpdateResponse.error)
        return handleErrors(roleUpdateResponse.data);
    }

    revalidatePath("/dashboard/usuarios");
    return { success: "Usuario actualizado exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};

export const deleteUser = async (previousState: any, formData: any) => {
  const { userId, id } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/auth/user/${userId}`;
  const headers = { "user-id": id };

  try {
    const response = await fetchDeleteRequest({ url, headers });
    if (response.status === 500) return handleErrors(response.data);
    if (response.error) return handleErrors(response.data);

    revalidatePath("/dashboard/usuarios");
    return { success: "Usuario eliminado exitosamente" };
  } catch (error) {
    return handleErrors(error);
  }
};

export const logout = async () => {
  await signOut();
};
