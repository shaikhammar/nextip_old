import { validateRequest } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

import BreadcrumbNav from "@/components/breadcrumb";
import ClientForm from "@/components/client-form";
import { getClient } from "@/actions/client.actions";
import { ActionResult } from "@/actions";

export default async function EditClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }

  let result: ActionResult;

  result = await getClient(+params.clientId);

  const client = JSON.parse(result.data!);

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <BreadcrumbNav />
        </div>
        <div className="mx-auto">
          <ClientForm client={client} clientId={client.clientId} />
        </div>
      </main>
      {/* <Toaster /> */}
    </>
  );
}
