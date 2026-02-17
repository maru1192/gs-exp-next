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
    fetchPosts();
  };

  // ========================================
  // 投稿一覧を取得
  // ========================================

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

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
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}