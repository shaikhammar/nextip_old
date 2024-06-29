import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

import BreadcrumbNav from "@/components/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import InvoiceForm from "@/components/invoice-form";

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
          <InvoiceForm />
        </div>
      </main>

      <Toaster />
    </>
  );
}
