// /payment-success/page.tsx
"use client"; // ensures this page is treated as a client component

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic"; // skips prerendering

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Payment Successful ✅
      </h1>
      {reference ? (
        <p className="text-lg text-gray-800">
          Your payment reference is: <strong>{reference}</strong>
        </p>
      ) : (
        <p className="text-lg text-gray-800">No payment reference found.</p>
      )}
      <p className="mt-6 text-sm text-gray-500">
        Thank you for your payment. You should also receive an email with your
        ticket and QR code shortly.
      </p>
    </div>
  );
}
