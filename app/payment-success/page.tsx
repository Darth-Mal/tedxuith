// force dynamic rendering — prevents prerender errors on Vercel
export const dynamic = "force-dynamic";

import PaymentSuccessClient from "./PaymentSuccessClient";

export default function Page() {
  return <PaymentSuccessClient />;
}
