// src/app/login/page.tsx

// ========================================
// ログインページ（UIのみ）
// ========================================
// 認証機能は Day2 で実装します

export default function LoginPage() {
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