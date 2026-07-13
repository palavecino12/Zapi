import Aos from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const navigate = useNavigate();

  // Movimiento del grupo completo (Z + API)
  const [groupSpring, groupApi] = useSpring(() => ({
    from: {
      x: 65, // La Z comienza centrada
    },
  }));

  // Animación del texto
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
        // Espera a que aparezca el logo
        await next({
          delay: 600,
        });

        // Mientras aparece API, todo el grupo se mueve al centro
        await next({
          x: 0,
          config: {
            tension: 120,
            friction: 14,
          },
        });

        // Espera un momento
        await next({
          delay: 1800,
        });

        // Al desaparecer API, vuelve a quedar solo la Z centrada
        await next({
          x: 65,
          config: {
            tension: 140,
            friction: 16,
          },
        });
      },
    });

    textApi.start({
      to: async (next) => {
        await next({
          delay: 600,
          opacity: 1,
          x: 115,
          config: {
            tension: 120,
            friction: 14,
          },
        });

        await next({
          delay: 1800,
          opacity: 0,
          x: 0,
          config: {
            tension: 140,
            friction: 16,
          },
        });
      },
    });

    const timer = setTimeout(() => {
      navigate("/cart");
    }, 4000);

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