"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PlaceOrderButton() {
  return (
    <Button
      size="sm"
      className="thc-btn-gradient thc-btn-3d ml-1 font-semibold transition-transform duration-150"
      onClick={() => toast.info("Please connect your broker to place orders easily!")}
    >
      Place Order
    </Button>
  );
}
