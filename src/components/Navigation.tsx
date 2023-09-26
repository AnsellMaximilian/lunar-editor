import { Link } from "react-router-dom";
import logoLight from "../assets/lunar-logo-light.svg";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navigation() {
  const { isSignedIn } = useUser();

  return (
    <div className="relative">
      <nav className="p-4 flex items-center z-20">
        <Link to="/" className="mr-8">
          <img src={logoLight} className="w-40" />
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
        <div className="ml-auto flex items-center gap-2">
          {!isSignedIn && (
            <>
              <Link
                to="/sign-in"
                className="block px-4 py-2 text-vs-dark rounded-md bg-white font-bold shadow-lg hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="block px-4 py-2 text-white rounded-md bg-purple-900 font-bold shadow-lg hover:bg-purple-950"
              >
                Register
              </Link>
            </>
          )}
          {isSignedIn && (
            <div className="p-1 bg-white rounded-full shadow-md shadow-white">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
