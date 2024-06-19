import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

import BreadcrumbNav from "@/components/breadcrumb";
import ClientForm from "@/components/client-form";
import { Toaster } from "@/components/ui/toaster";
import { getCurrencies } from "@/actions/currency.actions";
import { Currency } from "@/lib/types/currency";

export default async function CreateClientPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <BreadcrumbNav />
        </div>
        <div className="mx-auto">
          <ClientForm />
        </div>
      </main>

      <Toaster />
    </>
  );
}
