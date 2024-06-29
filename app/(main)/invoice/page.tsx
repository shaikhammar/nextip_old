import { getInvoices } from "@/actions/invoice.actions";
import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import BreadcrumbNav from "@/components/breadcrumb";
import Link from "next/link";
import { Invoice } from "@/lib/types/invoice";
import { invoiceColumns } from "@/components/invoice-table";

export default async function InvoicePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }
  const result = await getInvoices();
  const invoices: Invoice[] = JSON.parse(result.data!);

  if (result?.error && result?.error !== "") {
    toast({
      variant: "destructive",
      className: "top-right",
      description: result.error,
    });
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-1 p-4 md:gap-1 md:p-8">
        <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          <BreadcrumbNav />
        </div>
        <div className="flex container justify-end w-450">
          <Link href="/invoice/create">
            <Button>New Invoice</Button>
          </Link>
        </div>
        <div className="container mx-auto py-1">
          <DataTable columns={invoiceColumns} data={invoices} />
        </div>
        <Toaster />
      </main>
    </>
  );
}
