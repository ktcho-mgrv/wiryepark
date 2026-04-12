"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ApartmentStat {
  district: string;
  apartment: string;
  count: number;
}

export function ApartmentRanking() {
  const [data, setData] = useState<ApartmentStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data: rows } = await supabase
          .from("apartment_stats")
          .select("*")
          .limit(10);
        if (rows) setData(rows as ApartmentStat[]);
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

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <p className="text-gray-400 text-center py-8">
          서명이 시작되면 아파트별 순위가 표시됩니다.
        </p>
      </div>
    );
  }

  const maxCount = data[0]?.count || 1;

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-3">
      {data.map((item, i) => (
        <div key={`${item.district}-${item.apartment}`} className="flex items-center gap-3">
          <span className="w-6 text-center text-sm font-bold text-gray-400">
            {i + 1}
          </span>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{item.apartment}</span>
              <span className="text-gray-500 text-xs">{item.district}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600 w-12 text-right">
            {item.count}명
          </span>
        </div>
      ))}
    </div>
  );
}
