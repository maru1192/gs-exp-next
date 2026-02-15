// src/lib/supabase/server.ts

// ========================================
// サーバー用の Supabase クライアント
// ========================================
// Server Components や Route Handlers で使う

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    // Next.js の cookies() を取得
    // → サーバー側で Cookie を読み書きするため
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Cookie を取得する関数
                getAll() {
                    return cookieStore.getAll();
                },
                // Cookie を設定する関数
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Server Component では Cookie を設定できない場合がある
                        // その場合は無視（エラーにしない）
                    }
                },
            },
        }
    );
}