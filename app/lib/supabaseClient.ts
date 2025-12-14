// lib/supabaseClient.ts
"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// On ne crée le client qu’une seule fois côté navigateur
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
