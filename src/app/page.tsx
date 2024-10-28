import LogInForm from "@forms/LogInForm";
import IsolashesLogo from "@ui/icons/IsolashesLogo";
import React from "react";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-2 overflow-hidden bg-center bg-cover gap-y-10 bg-brandPink rounded-small sm:p-4 lg:p-8">
      {/* Brand Logo */}

      <div className="flex items-center">
        <IsolashesLogo className="w-40 h-auto mb-4 lg:w-48 xl:w-60" />
      </div>

      {/* Login Form */}
      <div className="flex flex-col w-full max-w-lg gap-4 px-8 pt-6 pb-10 rounded-large bg-content1 shadow-small">
        <p className="pb-2 text-xl font-medium text-center">Iniciar Sesión</p>
        <LogInForm />
      </div>
    </div>
  );
}
