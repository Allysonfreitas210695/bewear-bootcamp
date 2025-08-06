"use client";

import { ShoppingCartIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Card = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
};

export default Card;
