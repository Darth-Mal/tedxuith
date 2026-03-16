"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentStatus = {
  success: boolean;
  message: string;
};

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference) {
      setStatus({ success: false, message: "No payment reference found." });
      setLoading(false);
      return;
    }

    // Call your API to verify payment and send ticket email
    fetch(`/api/verify-payment?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
      })
      .catch((err) => {
        setStatus({ success: false, message: "Error verifying payment." });
      })
      .finally(() => setLoading(false));
  }, [reference]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1
        className={`text-3xl font-bold mb-4 ${
          status?.success ? "text-green-600" : "text-red-600"
        }`}
      >
        {status?.success ? "Payment Successful ✅" : "Payment Failed ❌"}
      </h1>
      <p className="text-lg text-gray-800">{status?.message}</p>
    </div>
  );
}
