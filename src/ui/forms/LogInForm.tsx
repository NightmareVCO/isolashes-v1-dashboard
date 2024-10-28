"use client";

import { login } from "@action/auth.action";
import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function useLogInForm() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [state, formAction] = useFormState(login, undefined);

  useEffect(() => {
    if (!state?.error) router.push("/");
  }, [state, router]);

  return {
    isVisible,
    toggleVisibility,
    state,
    formAction,
  };
}

export default function LogInForm() {
  const { isVisible, toggleVisibility, state, formAction } = useLogInForm();

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        label="Correo Electrónico"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        type="email"
        size="lg"
        errorMessage="Correo electrónico inválido"
        isRequired
        isClearable
      />
      <Input
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <Icon
                className="text-2xl pointer-events-none text-default-400"
                icon="solar:eye-closed-linear"
              />
            ) : (
              <Icon
                className="text-2xl pointer-events-none text-default-400"
                icon="solar:eye-bold"
              />
            )}
          </button>
        }
        label="Contraseña"
        name="password"
        placeholder="Ingresa tu contraseña"
        type={isVisible ? "text" : "password"}
        size="lg"
        isRequired
      />
      {state?.error && (
        <p className="text-center text-red-500 text-medium">
          Credenciales inválidas
        </p>
      )}
      <Button size="lg" color="primary" type="submit">
        Iniciar Sesión
      </Button>
    </form>
  );
}
