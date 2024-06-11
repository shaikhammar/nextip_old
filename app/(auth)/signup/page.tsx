import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/components/signup-form";
import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function SignupPage() {
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
            <SignupForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
