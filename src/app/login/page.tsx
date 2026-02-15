// src/app/login/page.tsx

"use client";

// ========================================
// インポート
// ========================================

import { useState } from "react";
// → useState: コンポーネント内で変化する値を管理
//   例: メールアドレス、パスワード、エラーメッセージなど

import { useRouter } from "next/navigation";
// → useRouter: ページ遷移に使う
//   例: ログイン成功後にメインページへ移動

import { createClient } from "@/lib/supabase/client";
// → Supabase クライアント
//   認証処理に使う


// ========================================
// ログインページ（UIのみ）
// ========================================
// 認証機能は Day2 で実装します

export default function LoginPage() {
    //
    // ========================================
    // State（状態）の定義
    // ========================================

    const [email, setEmail] = useState("");
    // → メールアドレスの入力値を保持

    const [password, setPassword] = useState("");
    // → パスワードの入力値を保持

    const [isLogin, setIsLogin] = useState(true);
    // → true: ログイン / false: 新規登録

    const [error, setError] = useState("");
    // → エラーメッセージを保持

    const [loading, setLoading] = useState(false);
    // → 処理中かどうか（ボタンの無効化に使う）


    // ========================================
    // Hooks（フック）の初期化
    // ========================================

    const router = useRouter();
    // → ページ遷移用

    const supabase = createClient();
    // → Supabase クライアント


    //送信の処理をします
    const handleAuth = async (e: React.FormEvent) => {
        //フォームタグの送信の際にページがリロードされるのを防ぐ
        e.preventDefault();

        //エラーをクリアにします
        setError("");

        //ローディングを管理するuseStateをtrueにして今処理をしている状態にします
        setLoading(true);

        //try catchを使って認証処理を記述します
        try {
            if (isLogin) {
                // → signInWithPassword: メール/パスワードでログイン supbaseの機能です！注意！
                //   成功すると Cookie にトークンが保存される
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                // ログイン成功 → トップページへ
                router.push("/");
                // → "/" に遷移

                router.refresh();
                // → ページをリフレッシュして認証状態を反映
                //   これがないと古い状態が表示されることがある
            } else {
                // → signUp: メール/パスワードで新規登録 supabaseの機能です！注意！
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                // → signUp: 新規ユーザーを登録
                //   ※ メール確認が必要な設定の場合は確認メールが送られる

                if (error) throw error;

                // 登録成功 → トップページへ
                router.push("/");
                router.refresh();
            }

            //supabaseの認証処理を呼び出します
        } catch (err) {
            //エラーが発生した場合はエラーメッセージをセットします
            setError("認証に失敗しました。もう一度お試しください。")
        } finally {
            //finallyは全ての処理が終わった後に必ず実行される処理です
            //処理が終わったらローディングをfalseにしてボタンを有効にします
            setLoading(false);
        }
    }


    //
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    <span className="text-4xl mr-2">✨</span>
                    SNS App
                </h1>

                {/* タブ切り替え（見た目のみ） */}
                <div className="flex mb-6">
                    <button className="flex-1 py-2 text-center text-white border-b-2 border-purple-500">
                        ログイン
                    </button>
                    <button className="flex-1 py-2 text-center text-white/50 border-b border-white/10">
                        新規登録
                    </button>
                </div>

                {/* フォーム（見た目のみ） */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-white/70 text-sm mb-2">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-white/70 text-sm mb-2">
                            パスワード
                        </label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                            placeholder="6文字以上"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
}