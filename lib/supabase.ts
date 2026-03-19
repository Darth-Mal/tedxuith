// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // still ok to use the public URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // use SERVICE_ROLE_KEY for server writes
);
