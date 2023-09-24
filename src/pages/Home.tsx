import Navigation from "../components/Navigation";
import moon from "../assets/moon.svg";
import astronaut from "../assets/astronaut.svg";
import outerbase from "../assets/outerbase.svg";
import stars1 from "../assets/stars-1.png";
import stars2 from "../assets/stars-2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTranslateValues } from "../utils/animation";

export default function Home() {
  const [moonTranslate, setMoonTranslate] = useState({ x: 0, y: 0 });
  const [stars1Translate, setStars1Translate] = useState({ x: 0, y: 0 });
  const [stars2Translate, setStars2Translate] = useState({ x: 0, y: 0 });
  const [astronautTranslate, setAstronautTranslate] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move: (this: Document, ev: MouseEvent) => void = (e) => {
      setMoonTranslate(getTranslateValues(e, 3));
      setStars1Translate(getTranslateValues(e, -3));
      setStars2Translate(getTranslateValues(e, 5));
      setAstronautTranslate(getTranslateValues(e, -10));
    };

    document.addEventListener("mousemove", move);

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="grow text-white">
      <div className="relative bg-gradient-to-b from-vs-dark via-zinc-700 to-purple-950">
        <div className="absolute inset-0">
          <img
            style={{
              transform: `translateX(${stars2Translate.x}px) translateY(${stars2Translate.y}px)`,
            }}
            src={stars2}
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute inset-0">
          <img
            src={stars1}
            style={{
              transform: `translateX(${stars1Translate.x}px) translateY(${stars1Translate.y}px)`,
            }}
            className="w-full h-full object-cover blur-[2px]"
          />
        </div>
        <Navigation />
        <div className="relative pb-10 px-4 md:px-0">
          <img
            src={moon}
            className="w-full sm:w-2/3 md:w-3/4 lg:w-2/3 mx-auto max-w-3xl"
            style={{
              transform: `translateX(${moonTranslate.x}px) translateY(${moonTranslate.y}px)`,
            }}
          />

          <div className="absolute inset-0 text-center text-zinc-800 flex items-center justify-center">
            <div className="absolute top-[10%] md:top-[20%] left-[10%] animate-[custom-bounce_3s_infinite]">
              <img
                src={astronaut}
                className="w-[50px] sm:w-[100px]"
                style={{
                  transform: `translateX(${astronautTranslate.x}px) translateY(${astronautTranslate.y}px) rotate(20deg)`,
                }}
              />
            </div>
            <div className="relative px-4 md:w-full">
              <h1 className="text-2xl md:text-5xl font-bold md:mb-2 flex gap-3 items-center justify-center">
                <span>Create</span>
                <a href="https://outerbase.com/" target="_blank">
                  <img src={outerbase} className="w-32 md:w-auto" />
                </a>
                <span>Plugins</span>
              </h1>
              <p className="text-sm md:text-2xl font-medium">
                Create, Debug, and Edit Outerbase Plugins Online
              </p>
              <div className="mt-4">
                <Link
                  to="/editor"
                  className="inline-block px-4 py-2 md:px-6 md:py-4 rounded-md bg-zinc-800 hover:bg-zinc-900 text-white text-sm md:text-xl shadow-lg font-bold"
                >
                  Start Creating <span className="animate-pulse">_</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-vs-dark h-96">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-purple-950"
            fillOpacity="1"
            d="M0,192L240,96L480,224L720,128L960,192L1200,192L1440,320L1440,0L1200,0L960,0L720,0L480,0L240,0L0,0Z"
          ></path>
        </svg>
        <div>
          <h2 className="text-3xl font-bold text-center">
            Define your interests
          </h2>
        </div>
      </div>
    </div>
  );
}
