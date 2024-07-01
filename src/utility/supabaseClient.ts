import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://vuaqhqrdwvwobvpwsavg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YXFocXJkd3Z3b2J2cHdzYXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MzYwMzcsImV4cCI6MjAzNTAxMjAzN30.ZhCAAUPE-cHGFqjVgH8QQ093meHHEHfBXdnPVblUX7Q";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
