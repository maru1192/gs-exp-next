// src/components/PostCard.tsx

// ========================================
// 投稿カードコンポーネント（UIのみ）
// ========================================
// いいね・削除機能は Day2, Day3 で実装します

import { SamplePost } from "@/types";

// アバターの色
const avatarColors = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-amber-500",
];

function getAvatarColor(username: string) {
    const index = username.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
}

type PostCardProps = {
    post: SamplePost;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 card-hover">
            {/* ヘッダー */}
            <div className="flex items-center gap-3 mb-3">
                <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(
                        post.username
                    )} flex items-center justify-center text-white font-bold text-lg`}
                >
                    {post.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-white">{post.username}</p>
                    <p className="text-white/50 text-sm">{post.createdAt}</p>
                </div>
                <button className="text-white/30 hover:text-red-400 transition">
                    🗑️
                </button>
            </div>

            {/* コンテンツ */}
            <p className="text-white text-lg mb-3 whitespace-pre-wrap">
                {post.content}
            </p>

            {/* 画像 */}
            {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                        src={post.image}
                        alt=""
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* アクション */}
            <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                <button
                    className={`flex items-center gap-2 transition-all ${post.isLiked ? "text-pink-500" : "text-white/50 hover:text-pink-500"
                        }`}
                >
                    <span className="text-xl">{post.isLiked ? "❤️" : "🤍"}</span>
                    <span className="font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-white/50 hover:text-blue-400 transition">
                    <span className="text-xl">💬</span>
                    <span className="font-medium">0</span>
                </button>

                <button className="flex items-center gap-2 text-white/50 hover:text-green-400 transition">
                    <span className="text-xl">🔄</span>
                </button>
            </div>
        </article>
    );
}