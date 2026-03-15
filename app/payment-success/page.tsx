// "use client"; // Must be first line

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// // Placeholder function to simulate sending email with QR
// async function sendTicketEmail(reference: string) {
//   console.log("[sendTicketEmail] Sending ticket for reference:", reference);
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   console.log(
//     "[sendTicketEmail] Email sent successfully for reference:",
//     reference,
//   );
//   return true;
// }

// export default function PaymentSuccessPage() {
//   const searchParams = useSearchParams();
//   const reference = searchParams.get("reference");

//   const [emailSent, setEmailSent] = useState(false);

//   useEffect(() => {
//     console.log("[useEffect] Page loaded");
//     console.log("[useEffect] Current searchParams:", searchParams.toString());
//     console.log("[useEffect] Extracted reference:", reference);

//     if (!reference) {
//       console.warn("[useEffect] No reference found in URL!");
//       return;
//     }

//     // Send ticket/QR code email
//     sendTicketEmail(reference)
//       .then(() => {
//         console.log("[useEffect] Email sent successfully, updating state...");
//         setEmailSent(true);
//       })
//       .catch((err) => {
//         console.error("[useEffect] Failed to send email:", err);
//       });
//   }, [reference, searchParams]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       <h1 className="text-3xl font-bold text-green-600 mb-4">
//         Payment Successful!
//       </h1>

//       {reference ? (
//         <>
//           <p className="text-center text-gray-700 mb-2">
//             Your payment reference is: <strong>{reference}</strong>
//           </p>
//           <p className="text-center text-gray-500 mb-4">
//             {emailSent
//               ? "Your ticket and QR code have been sent to your email."
//               : "Sending your ticket and QR code to your email..."}
//           </p>
//         </>
//       ) : (
//         <p className="text-center text-red-500 mb-4">
//           No payment reference found.
//         </p>
//       )}
//     </div>
//   );
// }
