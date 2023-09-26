import Navigation from "../components/Navigation";
import moon from "../assets/moon.svg";
import logoLight from "../assets/lunar-logo-light.svg";
import astronaut from "../assets/astronaut.svg";
import outerbase from "../assets/outerbase.svg";
import stars1 from "../assets/stars-1.png";
import stars2 from "../assets/stars-2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTranslateValues } from "../utils/animation";
import debugView from "../assets/debug-view.png";
import tableView from "../assets/table-view.png";
import pluginView from "../assets/plugin-view.png";

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
      <div className="bg-vs-dark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-purple-950"
            fillOpacity="1"
            d="M0,192L240,96L480,224L720,128L960,192L1200,192L1440,320L1440,0L1200,0L960,0L720,0L480,0L240,0L0,0Z"
          ></path>
        </svg>
        <div className="bg-vs-dark bg-gradient-to-b from-vs-dark via-zinc-800 to-vs-dark container mx-auto p-4 pb-32">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <div className="flex flex-col gap-16">
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex-1 flex items-center">
                <img src={pluginView} className="h-[90%] my-auto" />
              </div>
              <div className="flex justify-center flex-col flex-1">
                <h3 className="text-3xl font-medium mb-2">Live Preview</h3>
                <p className="text-xl">
                  Enhance your development workflow by providing instant
                  feedback on your code changes as you type. It's designed to
                  improve productivity, streamline debugging, and make coding
                  more intuitive.
                </p>
              </div>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex-1 flex items-center lg:order-2">
                <img src={tableView} className="h-[90%] my-auto" />
              </div>
              <div className="flex justify-center flex-col flex-1">
                <h3 className="text-3xl font-medium mb-2">
                  Create Mock Table Data
                </h3>
                <p className="text-xl">
                  Effortlessly generate simulated data that aligns with the
                  structure of your database tables. With a few simple clicks
                  and selections, you can create realistic and customizable mock
                  data for testing, development, and demonstration purposes.
                </p>
              </div>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex-1 flex items-center">
                <img src={debugView} className="h-[90%] my-auto" />
              </div>
              <div className="flex justify-center flex-col flex-1">
                <h3 className="text-3xl font-medium mb-2">Debug Plugins</h3>
                <p className="text-xl">
                  The "Debug View" is an indispensable tool for plugin
                  developers, providing a comprehensive and insightful analysis
                  of your plugin code to identify missing elements, errors, or
                  potential issues. This specialized view offers users a clear
                  and structured breakdown of their code, recommending actions
                  to take..
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white text-vs-dark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              className="fill-vs-dark"
              fillOpacity="1"
              d="M0,96L0,32L51.4,32L51.4,288L102.9,288L102.9,96L154.3,96L154.3,96L205.7,96L205.7,96L257.1,96L257.1,256L308.6,256L308.6,64L360,64L360,64L411.4,64L411.4,32L462.9,32L462.9,96L514.3,96L514.3,288L565.7,288L565.7,256L617.1,256L617.1,32L668.6,32L668.6,96L720,96L720,64L771.4,64L771.4,192L822.9,192L822.9,96L874.3,96L874.3,128L925.7,128L925.7,0L977.1,0L977.1,64L1028.6,64L1028.6,288L1080,288L1080,64L1131.4,64L1131.4,32L1182.9,32L1182.9,0L1234.3,0L1234.3,320L1285.7,320L1285.7,288L1337.1,288L1337.1,192L1388.6,192L1388.6,64L1440,64L1440,0L1388.6,0L1388.6,0L1337.1,0L1337.1,0L1285.7,0L1285.7,0L1234.3,0L1234.3,0L1182.9,0L1182.9,0L1131.4,0L1131.4,0L1080,0L1080,0L1028.6,0L1028.6,0L977.1,0L977.1,0L925.7,0L925.7,0L874.3,0L874.3,0L822.9,0L822.9,0L771.4,0L771.4,0L720,0L720,0L668.6,0L668.6,0L617.1,0L617.1,0L565.7,0L565.7,0L514.3,0L514.3,0L462.9,0L462.9,0L411.4,0L411.4,0L360,0L360,0L308.6,0L308.6,0L257.1,0L257.1,0L205.7,0L205.7,0L154.3,0L154.3,0L102.9,0L102.9,0L51.4,0L51.4,0L0,0L0,0Z"
            ></path>
          </svg>
          <div className="p-4 pt-16 pb-16 container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 relative z-20">
              Cloud Storage with Outerbase
            </h2>
            <div className="">
              <p className="text-xl md:text-2xl text-center mb-6">
                Thanks to Outerbase's own features and managed database Lunar
                Editor has utilized, you will be able to persist your created
                plugins. Create and save your plugin, open it later, and update
                it. It's your own personal workspace for creating plugins!
              </p>
              <div className="text-center">
                <Link
                  to="/plugins"
                  className="inline-block px-6 py-4 rounded-md bg-purple-900 hover:bg-purple-950 text-xl font-bold text-white"
                >
                  Check Plugins
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-vs-dark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              className="fill-white"
              fillOpacity="1"
              d="M0,160L80,138.7C160,117,320,75,480,85.3C640,96,800,160,960,170.7C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <div className="p-4 flex items-center justify-between">
            <Link to="/">
              <img src={logoLight} className="w-32" />
            </Link>
            <ul className="flex items-cener gap-6 text-lg font-bold tracking-wider">
              <li>
                <Link
                  to="/editor"
                  className="relative hover:before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
                >
                  Editor
                </Link>
              </li>
              <li>
                <Link
                  to="/plugins"
                  className="relative hover:before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
                >
                  Plugins
                </Link>
              </li>
              <li>
                <Link
                  to="/editor"
                  className="relative hover:before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
                >
                  Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://outerbase.com/"
                  target="_blank"
                  className="relative hover:before:content-['>'] before:absolute before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
                >
                  Outerbase
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
