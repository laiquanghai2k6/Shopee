'use client'

import PaymentSuccess from "@/components/Payment/PaymentSuccess";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
