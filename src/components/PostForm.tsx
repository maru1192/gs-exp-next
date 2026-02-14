// src/components/PostForm.tsx

// ========================================
// 投稿フォームコンポーネント（UIのみ）
// ========================================
// 投稿機能は Day2 で実装します

type PostFormProps = {
    userInitial?: string;
};

export default function PostForm({ userInitial = "U" }: PostFormProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 mb-6 border border-white/10 card-hover">
            <form>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {userInitial}
                    </div>
                    <div className="flex-1">
                        <textarea
                            placeholder="いまなにしてる？"
                            className="w-full bg-transparent text-white placeholder-white/50 resize-none outline-none text-lg"
                            rows={3}
                        />
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="p-2 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white"
                                >
                                    🖼️
                                </button>
                                <button
                                    type="button"
                                    className="p-2 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white"
                                >
                                    😊
                                </button>
                            </div>
                            <button
                                type="button"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full transition-all"
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