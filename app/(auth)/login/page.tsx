import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/dashboard");
  }
  return (
    <>
      <main className="h-screen flex items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
