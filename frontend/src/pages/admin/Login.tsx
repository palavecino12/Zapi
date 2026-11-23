
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Imput } from "../../components/Imput";
import { Loading } from "../../components/feedback/Loading";
import { ErrorModal } from "../../components/feedback/ErrorModal";

import { useLogin } from "../../features/auth/hooks/useLogin";

export function Login() {
  const navigate = useNavigate();

  const { loginUser, loading, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser({ username, password });

      navigate("/admin/statistics");

    } catch {
      // El ErrorModal se encarga de mostrar el error.
    }
  };

  return (
    <>
      {/* Feedback de carga y errores */}
      {loading && <Loading message="Iniciando sesión..." />}

      <ErrorModal
        error={error ? "No se pudo iniciar sesión. Verificá tus credenciales." : null}
      />

      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-violet-600 via-violet-700 to-violet-800 px-6 py-10 sm:px-8">

        {/* Decoración del fondo */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

        <div className="relative z-10 w-full max-w-sm">

          {/* Logo */}
          <header className="mb-5 text-center">
            <div className="mb-2 flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Logo de Zapi"
                className="h-30 w-30 object-contain"
              />

              <span className="font-[Poppins] text-3xl font-bold text-white">
                ZAPI
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
              onSubmit={handleSubmit}
            >
              <Imput
                label="Usuario"
                type="text"
                placeholder="Ingresa tu usuario"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />

              <Imput
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <Button
                type="submit"
                className="mt-2 w-full!"
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Entrar"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
