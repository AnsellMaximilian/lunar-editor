import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env
  .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY as string;

function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </div>
    </ClerkProvider>
  );
}

export default App;
