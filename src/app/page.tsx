"use client";

// ========================================
// インポート
// ========================================

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// コンポーネントをインポート
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

import type { Post } from "@/types";
import type { User } from "@supabase/supabase-js";

// ========================================
// 環境変数から API URL を取得
// ========================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";

// ========================================
// メインページコンポーネント
// ========================================

export default function Home() {
  // ========================================
  // State の定義
  // ========================================

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [animatingId, setAnimatingId] = useState<number | null>(null); // Day3 追加
  // → いいねアニメーション用

  // ========================================
  // Hooks の初期化
  // ========================================

  const router = useRouter();
  const supabase = createClient();

  // ========================================
  // 初期化処理
  // ========================================

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);
    setLoading(false);
    fetchPosts(user.id); // Day3 変更: ユーザーIDを渡す
  };

  // ========================================
  // 投稿一覧を取得（更新）
  // ========================================

  // --- Day3 変更 ここから ---
  // 引数に userId を追加（いいね状態の判定用）
  const fetchPosts = async (userId?: string) => {
    try {
      // userId をクエリパラメータで送る
      const url = userId
        ? `${API_URL}/api/posts?userId=${userId}`
        : `${API_URL}/api/posts`;

      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // --- Day3 変更 ここまで ---

  // ========================================
  // 投稿を作成
  // ========================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newPost,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("投稿に失敗しました");
      }

      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };


  // ========================================
  // 投稿を削除
  // ========================================

  const handleDelete = async (id: number) => {
    if (!confirm("この投稿を削除しますか？")) return;

    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("削除に失敗しました");
      }

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // ========================================
  // ログアウト処理
  // ========================================

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ========================================
  // ローディング中
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen">
      {/* ヘッダー（コンポーネントを使用） */}
      <Header
        userInitial={user?.email?.charAt(0).toUpperCase()}
        onLogout={handleLogout}
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 投稿フォーム（コンポーネントを使用） */}
        <PostForm
          userInitial={user?.email?.charAt(0).toUpperCase()}
          value={newPost}
          onChange={setNewPost}
          onSubmit={handleSubmit}
        />

        {/* タイムライン */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center text-white/50 py-12">
              まだ投稿がありません
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                onLike={handleLike}           // Day3 追加
                isAnimating={animatingId === post.id}  // Day3 追加
              />
            ))
          )}
        </div>
      </main>
    </div>
  );

  // ========================================
  // いいね処理（新規追加）
  // ========================================

  // --- Day3 追加 ここから ---
  const handleLike = async (postId: number, isLiked: boolean) => {
    if (!user) return;

    // アニメーション開始
    setAnimatingId(postId);
    setTimeout(() => setAnimatingId(null), 400);

    try {
      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("いいねに失敗しました");
      }

      const data = await response.json();

      // 投稿一覧を更新（該当の投稿だけ更新）
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likeCount: data.likeCount,
            isLiked: data.isLiked,
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  // --- Day3 追加 ここまで ---
}