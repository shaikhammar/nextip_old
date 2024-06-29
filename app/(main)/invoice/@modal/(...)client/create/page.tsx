"use client";
import ClientForm from "@/components/client-form";
import { validateRequest } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function InterceptedCreateClientPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  function onDismiss() {
    setOpen(false);
    router.back();
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onDismiss} modal={true}>
        <DialogContent className="sm:max-w-[800px]">
          <ClientForm formOpen={open} onFormClose={onDismiss} />
        </DialogContent>
      </Dialog>
    </>
  );
}
