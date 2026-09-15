import { Lock, Mail } from "lucide-react";

import { Button } from "../../components/Button";
import { Imput } from "../../components/Imput";

export function Login() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-white px-8">
      <div className="w-full max-w-sm">

        <header className="mb-8 text-center">
          <h1 className="font-[Poppins] text-3xl font-bold text-black">
            Iniciar Sesión
          </h1>
          <p className="mt-1 text-xs font-medium text-violet-600">
            Ingresa tus credenciales de Zapi
          </p>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Imput
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            icon={<Mail size={16} strokeWidth={2} />}
          />

          <Imput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            icon={<Lock size={16} strokeWidth={2} />}
          />

          <Button type="submit" className="mt-2 w-full!">
            Entrar
          </Button>
        </form>

      </div>
    </div>
  );
}