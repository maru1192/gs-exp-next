// src/components/PostCard.tsx

"use client";

import type { Post } from "@/types";

// ========================================
// 投稿カードコンポーネント（いいね機能対応）
// ========================================

type PostCardProps = {
    post: Post;
    onDelete?: (id: number) => void;
    // --- Day3 追加 ここから ---
    onLike?: (id: number, isLiked: boolean) => void;
    isAnimating?: boolean;
    // --- Day3 追加 ここまで ---
    formatDate?: (dateString: string) => string;
};

export default function PostCard({
    post,
    onDelete,
    onLike,           // Day3 追加
    isAnimating = false,  // Day3 追加
    formatDate,
}: PostCardProps) {
    // デフォルトの日付フォーマット
    const defaultFormatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60 * 1000) return "たった今";
        if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分前`;
        if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
        return date.toLocaleDateString("ja-JP");
    };

    const displayDate = formatDate ? formatDate(post.createdAt) : defaultFormatDate(post.createdAt);

    return (
        <article className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 card-hover">
            {/* ヘッダー */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    U
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-white">ユーザー</p>
                    <p className="text-white/50 text-sm">{displayDate}</p>
                </div>
                {/* 削除ボタン */}
                {onDelete && (
                    <button
                        onClick={() => onDelete(post.id)}
                        className="text-white/30 hover:text-red-400 transition"
                    >
                        🗑️
                    </button>
                )}
            </div>

            {/* コンテンツ */}
            <p className="text-white text-lg whitespace-pre-wrap mb-3">
                {post.content}
            </p>

            {/* 画像 */}
            {post.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden">{/* mb-4 は Day3 追加 */}
                    <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* --- Day3 追加 ここから --- */}
            {/* アクション（いいねボタン） */}
            <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                <button
                    onClick={() => onLike?.(post.id, post.isLiked)}
                    className={`flex items-center gap-2 transition-all ${post.isLiked
                            ? "text-pink-500"
                            : "text-white/50 hover:text-pink-500"
                        } ${isAnimating ? "heart-animation" : ""}`}
                >
                    <span className="text-xl">
                        {post.isLiked ? "❤️" : "🤍"}
                    </span>
                    <span className="font-medium">{post.likeCount}</span>
                </button>
            </div>
            {/* --- Day3 追加 ここまで --- */}
        </article>
    );
}