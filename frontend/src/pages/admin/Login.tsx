

import { Button } from "../../components/Button";
import { Imput } from "../../components/Imput";

export function Login() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center overflow-y-auto bg-white px-6 py-10 sm:px-8">
      <div className="w-full max-w-sm">

        <header className="mb-8 text-center">
          <h1 className="font-[Poppins] text-2xl font-bold text-black sm:text-3xl">
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
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
          />

          <Imput
            label="Contraseña"
            type="password"
            placeholder="••••••••"          
          />

          <Button type="submit" className="mt-2 w-full!">
            Entrar
          </Button>
        </form>

      </div>
    </div>
  );
}
