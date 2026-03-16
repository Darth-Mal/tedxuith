"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Reference: {reference}</p>
    </div>
  );
}
