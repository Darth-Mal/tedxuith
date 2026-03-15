"use client"; // ⚠️ This makes the page fully client-side

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      // TODO: Call your API to verify payment / send email with QR code
      console.log("Payment reference:", reference);
    }
  }, [reference]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-center text-gray-700 mb-4">
        Your payment reference is: <strong>{reference}</strong>
      </p>
      <p className="text-center text-gray-500">
        Check your email for your ticket and QR code.
      </p>
    </div>
  );
}
