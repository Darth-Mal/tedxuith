"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentStatus = {
  success: boolean;
  message?: string;
  ticketSerial?: string;
  qrCode?: string;
};

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference"); // Paystack reference

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference) {
      setStatus({ success: false, message: "No payment reference found." });
      setLoading(false);
      return;
    }

    // POST to verify-payment with Paystack reference
    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketReference: reference }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus({
            success: true,
            ticketSerial: data.ticketSerial,
            qrCode: data.qrCode,
          });
        } else {
          setStatus({
            success: false,
            message: data.error || "Payment verification failed.",
          });
        }
      })
      .catch(() => {
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

      {status?.success ? (
        <>
          <p className="text-lg text-gray-800 mb-4">
            Ticket ID: {status.ticketSerial}
          </p>
          {status.qrCode && (
            <img src={status.qrCode} alt="Your Ticket QR Code" />
          )}
        </>
      ) : (
        <p className="text-lg text-gray-800">{status?.message}</p>
      )}
    </div>
  );
}
