import stars1 from "../assets/stars-1.png";
import stars2 from "../assets/stars-2.png";
import { useEffect, useState, ReactNode } from "react";
import { getTranslateValues } from "../utils/animation";
import logoLight from "../assets/lunar-logo-light.svg";
import { Link } from "react-router-dom";
import astronaut from "../assets/astronaut.svg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [stars1Translate, setStars1Translate] = useState({ x: 0, y: 0 });
  const [stars2Translate, setStars2Translate] = useState({ x: 0, y: 0 });
  const [astronautTranslate, setAstronautTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move: (this: Document, ev: MouseEvent) => void = (e) => {
      setStars1Translate(getTranslateValues(e, -3));
      setStars2Translate(getTranslateValues(e, 5));
      setAstronautTranslate(getTranslateValues(e, -10));
    };

    document.addEventListener("mousemove", move);

    return () => document.removeEventListener("mousemove", move);
  }, []);
  return (
    <div className="grow bg-gradient-to-b bg-vs-dark py-4 from-vs-dark via-zinc-700 to-purple-950 flex items-center justify-center relative">
      <div className="absolute inset-4">
        <img
          style={{
            transform: `translateX(${stars2Translate.x}px) translateY(${stars2Translate.y}px)`,
          }}
          src={stars2}
          className="w-full h-full object-cover blur-sm"
        />
      </div>
      <div className="absolute inset-4">
        <img
          src={stars1}
          style={{
            transform: `translateX(${stars1Translate.x}px) translateY(${stars1Translate.y}px)`,
          }}
          className="w-full h-full object-cover blur-[2px]"
        />
      </div>
      <div className="absolute top-[10%] md:top-[20%] left-[10%] animate-[custom-bounce_3s_infinite]">
        <img
          src={astronaut}
          className="w-[50px] sm:w-[100px]"
          style={{
            transform: `translateX(${astronautTranslate.x}px) translateY(${astronautTranslate.y}px) rotate(20deg)`,
          }}
        />
      </div>
      <div className="flex justify-center flex-col items-center gap-8 relative">
        <Link to="/" className="mr-8">
          <img src={logoLight} className="w-32" />
        </Link>
        {children}
      </div>
    </div>
  );
}
