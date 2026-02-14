// src/types/index.ts

// ========================================
// 投稿の型定義
// ========================================
// この型は Day2 以降で API と連携するときに使います

export type Post = {
    id: number;
    content: string;
    imageUrl: string | null;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    isLiked: boolean;
};

// ========================================
// サンプルデータ用の型
// ========================================
// 今日はダミーデータを使うので、この型も用意

export type SamplePost = {
    id: number;
    username: string;
    content: string;
    image: string | null;
    likes: number;
    isLiked: boolean;
    createdAt: string;
};