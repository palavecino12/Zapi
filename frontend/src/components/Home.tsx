import Aos from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const nameTimer = setTimeout(() => {
      setShowName(true);
      Aos.refresh();
    }, 900);

  
    const pageTimer = setTimeout(() => {
      navigate("/cart"); 
    }, 4000);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(pageTimer);
    };
  }, [navigate]);

  return (
  <div className="w-full h-dvh bg-violet-600 flex flex-col items-center justify-center">
    <div data-aos="zoom-in" className="drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]">
      <img src="/logo.png" className="w-32 h-32 object-contain"alt="Logo"/>
    </div>

    {showName && (
      <h1
        data-aos="fade-up" className="mt-3 text-white text-5xl font-semibold tracking-[-0.06em]font-family:Poppins">
        zapi
      </h1>
    )}
</div>
  );
}
