import {
  Client,
  getClients,
  getModifiedClients,
} from "@/actions/client.actions";
import { clientColumns } from "@/components/client-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";

export default async function ClientPage() {
  const result = await getClients();
  const clients: Client[] = JSON.parse(result.data!);
  const modifiedClients = await getModifiedClients(clients);

  if (result?.error && result?.error !== "") {
    toast({
      variant: "destructive",
      className: "top-right",
      description: result.error,
    });
  }

  return (
    <>
      <div className="flex container justify-end w-450 pt-8">
        <Button>Add Client</Button>
      </div>
      <div className="container mx-auto py-1">
        <DataTable columns={clientColumns} data={modifiedClients} />
      </div>
      <Toaster />
    </>
  );
}
