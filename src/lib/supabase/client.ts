// src/lib/supabase/client.ts

// ========================================
// ブラウザ（クライアント）用の Supabase クライアント
// ========================================
// "use client" のコンポーネントで使う

import { createBrowserClient } from "@supabase/ssr";
// → ブラウザ用の Supabase クライアントを作る関数

// createClient 関数を作成
// 他のファイルからインポートして使う
export function createClient() {
    return createBrowserClient(
        // 環境変数から URL と Key を取得
        // ! = TypeScript に「絶対に値がある」と伝える
        //     もしなければエラーになる
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}