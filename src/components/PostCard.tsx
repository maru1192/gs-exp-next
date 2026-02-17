// src/components/PostCard.tsx
"use client";

// ========================================
// 投稿カードコンポーネント（UIのみ）
// ========================================
// いいね・削除機能は Day2, Day3 で実装します

import { Post, SamplePost } from "@/types";

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
    post: Post;
    // → API から取得した投稿データ
    onDelete?: (id: number) => void;
    // → 削除処理を親から受け取る
    formatDate?: (dateString: string) => string;
    // → 日付フォーマット関数を親から受け取る
};

export default function PostCard({
    post,
    onDelete,
    formatDate,
}: PostCardProps) {
    // デフォルトの日付フォーマット
    const defaultFormatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60 * 1000) return "たった今";
        if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分前`;
        if (diff < 24 * 60 * 60 * 1000)
            return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
        return date.toLocaleDateString("ja-JP");
    };

    const displayDate = formatDate
        ? formatDate(post.createdAt)
        : defaultFormatDate(post.createdAt);

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
                <div className="rounded-xl overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
        </article>
    );
}