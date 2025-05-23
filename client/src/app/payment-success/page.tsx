'use client'

import PaymentSuccess from "@/components/Payment/PaymentSuccess";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
