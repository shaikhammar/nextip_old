import { getClients } from "@/actions/client.actions";
import { clientColumns } from "@/components/client-table";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";

export default async function ClientPage() {
  const { clients } = await getClients();
  console.log(clients.data);

  //   if (clients?.error && clients?.error !== "") {
  //     toast({
  //       variant: "destructive",
  //       className: "top-right",
  //       description: clients.error,
  //     });
  //   }

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={clientColumns} data={clients.data} />
      </div>
      <Toaster />
    </>
  );
}
