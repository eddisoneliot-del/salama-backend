import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Remplace par ton URL Supabase et la clé Service Role
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    const url = new URL(req.url);

    // GET /users → récupère tous les utilisateurs
    if (req.method === "GET" && url.pathname === "/users") {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // POST /appointments → créer un rendez-vous
    if (req.method === "POST" && url.pathname === "/appointments") {
      const body = await req.json();
      const { patient_id, medecin_id, scheduled_at } = body;

      const { data, error } = await supabase
        .from("appointments")
        .insert([{ patient_id, medecin_id, scheduled_at }])
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
