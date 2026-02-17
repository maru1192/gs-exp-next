// src/components/PostForm.tsx
"use client";
// ========================================
// 投稿フォームコンポーネント（UIのみ）
// ========================================
// 投稿機能は Day2 で実装します

type PostFormProps = {
    userInitial?: string;
    value: string;
    onChange: (value: string) => void; //入力したものが変化したときの処理
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; //フォームのボタンが押されたかどうかの処理
    disabled?: boolean; //送信ボタンの状態
};

export default function PostForm({
    userInitial = "U",
    value,
    onChange,
    onSubmit,
    disabled = false,
}: PostFormProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 mb-6 border border-white/10 card-hover">
            <form onSubmit={onSubmit}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {userInitial}
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="いまなにしてる？"
                            className="w-full bg-transparent text-white placeholder-white/50 resize-none outline-none text-lg"
                            rows={3}
                        />
                        <div className="flex items-center justify-end mt-3 pt-3 border-t border-white/10">
                            <button
                                type="submit"
                                disabled={!value.trim() || disabled}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-full transition-all"
                            >
                                投稿する
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}