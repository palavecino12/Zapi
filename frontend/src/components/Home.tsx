import Aos from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const navigate = useNavigate();

  //Movimiento del grupo completo (Z + API)
  const [groupSpring, groupApi] = useSpring(() => ({
    from: {
      x: 65, // La Z comienza centrada
    },
  }));

  //Animación del texto
  const [textSpring, textApi] = useSpring(() => ({
    from: {
      x: 0,
      opacity: 0,
    },
  }));

  useEffect(() => {
    Aos.init();

    groupApi.start({
      to: async (next) => {
        // Espera a que aparezca el logo (más corto)
        await next({
          delay: 300,
        });

        // Mientras aparece API, todo el grupo se mueve al centro (más rápido)
        await next({
          x: 0,
          config: {
            tension: 280,
            friction: 20,
          },
        });

        // Se lee "ZAPI" por 1 a 2 segundos
        await next({
          delay: 1200,
        });

        // Al desaparecer API, vuelve a quedar solo la Z centrada (más rápido)
        await next({
          x: 65,
          config: {
            tension: 300,
            friction: 22,
          },
        });
      },
    });

    textApi.start({
      to: async (next) => {
        await next({
          delay: 300,
          opacity: 1,
          x: 115,
          config: {
            tension: 280,
            friction: 20,
          },
        });

        await next({
          delay: 1200,
          opacity: 0,
          x: 0,
          config: {
            tension: 300,
            friction: 22,
          },
        });
      },
    });

    const timer = setTimeout(() => {
      navigate("/cart");
    }, 2600);

    return () => clearTimeout(timer);
  }, [navigate, groupApi, textApi]);

  return (
    <div className="w-full h-dvh bg-violet-600 flex items-center justify-center overflow-hidden">
      <animated.div
        style={groupSpring}
        className="relative w-[260px] h-32"
      >
        {/* Texto API */}
        <animated.div
          style={textSpring}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-0 flex items-center h-full text-white text-6xl font-semibold tracking-[-0.06em] font-[Poppins] select-none"
        >
          API
        </animated.div>

        {/* Logo */}
        <div
          data-aos="zoom-in"
          className="absolute left-0 z-10 w-32 h-32"
        >
          <img
            src="/logo.png"
            className="w-full h-full object-contain select-none"
            alt="Logo"
          />
        </div>
      </animated.div>
    </div>
  );
}