import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Imput } from "../../components/Imput";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-violet-600 via-violet-700 to-violet-800 px-6 py-10 sm:px-8">
      {/* Decoración del fondo */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <header className="mb-10 text-center">
          <div className="mb-2 flex flex-col items-center">
            <span className="font-[Poppins] text-6xl font-bold leading-none text-white">
              Z
            </span>

            <span className="mt-2 font-[Poppins] text-3xl font-bold text-white">
              Zapi
            </span>
          </div>
        </header>

        {/* Tarjeta del formulario */}
        <div className="rounded-3xl bg-white px-6 py-8 shadow-2xl shadow-violet-950/20 sm:px-7">

          <div className="mb-7">
            <h1 className="font-[Poppins] text-2xl font-bold text-gray-900">
              Iniciar sesión
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Ingresa tus credenciales de Zapi
            </p>
          </div>

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

            <Button
              type="submit"
              className="mt-2 w-full!"
              onClick={() => navigate("/admin/statistics")}
            >
              Entrar
            </Button>

            <button
              type="button"
              className="mt-1 text-center text-xs font-medium text-gray-500 transition-colors hover:text-violet-600"
            >
              ¿Olvidaste tu{" "}
              <span className="text-violet-600 underline underline-offset-2">
                contraseña?
              </span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

