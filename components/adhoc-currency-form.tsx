import * as React from "react";

import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CurrencyForm from "./currency-form";

export default function AdhocCurrencyForm({
  open,
  onClose,
}: {
  open: any;
  onClose: any;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const handleCurrencyFormSubmit = () => {
    onClose();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Add Currency</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add currency</DialogTitle>
            <DialogDescription>
              Add new currency with the ISO code and currency name.
            </DialogDescription>
          </DialogHeader>
          <CurrencyForm onCurrencyFormSubmit={handleCurrencyFormSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Add Currency</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add currency</DrawerTitle>
          <DrawerDescription>
            Add new currency with the ISO code and currency name.
          </DrawerDescription>
        </DrawerHeader>
        <CurrencyForm onCurrencyFormSubmit={handleCurrencyFormSubmit} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
