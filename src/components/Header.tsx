// src/components/Header.tsx

// ========================================
// ヘッダーコンポーネント（UIのみ）
// ========================================
// ログアウト機能は Day2 で実装します

type HeaderProps = {
    userInitial?: string;
};

export default function Header({ userInitial = "U" }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl">✨</span>
                    SNS App
                </h1>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {userInitial}
                    </div>
                    <button className="text-white/70 hover:text-white transition text-sm">
                        ログアウト
                    </button>
                </div>
            </div>
        </header>
    );
}