import { getClients } from "@/actions/client.actions";
import { Client } from "@/lib/types/client";
import { clientColumns } from "@/components/client-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import BreadcrumbNav from "@/components/breadcrumb";
import Link from "next/link";

export default async function ClientPage() {
  const result = await getClients();
  const clients: Client[] = JSON.parse(result.data!);

  if (result?.error && result?.error !== "") {
    toast({
      variant: "destructive",
      className: "top-right",
      description: result.error,
    });
  }

  return (
    <>
      <main className="flex flex-1 flex-col gap-1 p-4 md:gap-1 md:p-2">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <BreadcrumbNav />
        </div>
        <div className="flex container justify-end w-450">
          <Link href="/client/create">
            <Button>Add Client</Button>
          </Link>
        </div>
        <div className="container mx-auto py-1">
          <DataTable columns={clientColumns} data={clients} />
        </div>
        <Toaster />
      </main>
    </>
  );
}
