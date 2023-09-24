import { SignIn } from "@clerk/clerk-react";
import AuthLayout from "../components/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
