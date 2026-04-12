"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Comment {
  masked_name: string;
  district: string;
  comment: string;
  created_at: string;
}

export function RecentComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await supabase
          .from("recent_comments")
          .select("*")
          .limit(10);
        if (data) setComments(data as Comment[]);
      } catch {
        // 연동 전 빈 상태
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 animate-pulse">
        불러오는 중...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <p className="text-gray-400 text-center py-8">
          서명 시 남긴 한마디가 이곳에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((c, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-700">&ldquo;{c.comment}&rdquo;</p>
          <p className="text-xs text-gray-400 mt-2">
            {c.masked_name} · {c.district} ·{" "}
            {new Date(c.created_at).toLocaleDateString("ko-KR")}
          </p>
        </div>
      ))}
    </div>
  );
}
