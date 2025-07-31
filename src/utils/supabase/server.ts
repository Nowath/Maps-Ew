"use server"
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          //@ts-ignore
          return cookieStore.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value
          }));
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options = {} }) => {
              //@ts-ignore
              cookieStore.set(name, value, {
                ...options,
                httpOnly: options.httpOnly ?? true,
                secure: options.secure ?? process.env.NODE_ENV === 'production',
                sameSite: options.sameSite ?? 'lax',
                path: options.path ?? '/',
              });
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};