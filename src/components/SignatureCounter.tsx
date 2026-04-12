"use client";

import { useEffect, useState } from "react";
import { WIRYE_POPULATION } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

interface Stats {
  total_count: number;
  hanam_count: number;
  seongnam_count: number;
  songpa_count: number;
}

const EMPTY_STATS: Stats = {
  total_count: 0,
  hanam_count: 0,
  seongnam_count: 0,
  songpa_count: 0,
};

export function SignatureCounter({ size = "large" }: { size?: "large" | "small" }) {
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from("signature_stats")
          .select("*")
          .single();
        if (!error && data) {
          setStats(data as Stats);
        }
      } catch {
        // Supabase 미연동 시 0으로 유지
      }
    }
    fetchStats();
  }, []);

  if (size === "small") {
    return (
      <span className="font-bold text-green-700">{stats.total_count.toLocaleString()}명</span>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 mb-1">현재 서명 참여</p>
        <p className="text-5xl font-bold text-green-700">
          {stats.total_count.toLocaleString()}
          <span className="text-2xl text-gray-400 ml-1">명</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          위례 전체 {WIRYE_POPULATION.toLocaleString()}명 중{" "}
          {stats.total_count > 0
            ? ((stats.total_count / WIRYE_POPULATION) * 100).toFixed(1)
            : "0.0"}
          %
        </p>
      </div>

      <div className="space-y-3">
        <DistrictBar label="하남시" count={stats.hanam_count} total={stats.total_count} color="bg-green-500" />
        <DistrictBar label="성남시" count={stats.seongnam_count} total={stats.total_count} color="bg-emerald-500" />
        <DistrictBar label="송파구" count={stats.songpa_count} total={stats.total_count} color="bg-teal-500" />
      </div>
    </div>
  );
}

function DistrictBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{count.toLocaleString()}명</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
