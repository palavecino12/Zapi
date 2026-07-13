import Aos from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const navigate = useNavigate();

  const [spring, api] = useSpring(() => ({
    from: { x: 0, opacity: 0 },
  }));

  useEffect(() => {

    Aos.init();

    api.start({
      to: async (next) => {
        // A los 600ms, se desliza 115px hacia la derecha para salir detrás del logo (w-32 = 128px)
        await next({
          x: 115,
          opacity: 1,
          delay: 600,
          config: { tension: 120, friction: 14 },
        });

        // Espera 1.8 segundos y se vuelve a deslizar a la izquierda (ocultándose detrás de la Z)
        await next({
          x: 0,
          opacity: 0,
          delay: 1800,
          config: { tension: 140, friction: 16 },
        });
      },
    });


    const pageTimer = setTimeout(() => {
      navigate("/cart");
    }, 4000);

    return () => {
      clearTimeout(pageTimer);
    };
  }, [api, navigate]);

  return (
    <div className="w-full h-dvh bg-violet-600 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-32 h-32">
        
        {/* texto api */}
        <animated.div
          style={spring}
          className="absolute left-0 z-0 flex items-center h-full text-white text-6xl font-semibold tracking-[-0.06em] font-[Poppins] drop-shadow-md select-none"
        >
          API
        </animated.div>

        <div
          data-aos="zoom-in"
          className="absolute left-0 z-10 w-32 h-32 drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]"
        >
          <img
            src="/logo.png"
            className="w-full h-full object-contain select-none"
            alt="Logo"
          />
        </div>

      </div>
    </div>
  );
}