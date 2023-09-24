import { Link } from "react-router-dom";
import logoLight from "../assets/lunar-logo-light.svg";

export default function Navigation() {
  return (
    <div className="relative">
      <nav className="p-4 flex items-center z-20">
        <Link to="/" className="mr-8">
          <img src={logoLight} className="w-40" />
        </Link>
        <ul className="flex items-cener gap-6 text-lg font-bold tracking-wider">
          <li>
            <Link to="/editor">Editor</Link>
          </li>
          <li>
            <Link to="/editor">Docs</Link>
          </li>
          <li>
            <Link to="/editor">Outerbase</Link>
          </li>
        </ul>
        <div className="ml-auto">
          <button className="px-4 py-2 text-vs-dark rounded-md bg-white font-bold">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
