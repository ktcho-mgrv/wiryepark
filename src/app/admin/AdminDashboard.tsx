"use client";

import { useState, useEffect, useCallback } from "react";

type Signature = {
  id: string;
  name: string;
  email: string;
  district: string;
  apartment: string;
  dong: string;
  comment: string | null;
  source: string | null;
  created_at: string;
};

type Stats = {
  total: number;
  districts: { district: string; count: number }[];
  daily: { date: string; count: number }[];
};

type ListResponse = {
  signatures: Signature[];
  total: number;
  page: number;
  totalPages: number;
};

async function api(body: Record<string, unknown>) {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"stats" | "list">("stats");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await api({ password, action: "verify" });
    if (res.ok) {
      setAuthed(true);
    } else {
      setAuthError("비밀번호가 올바르지 않습니다.");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 space-y-4"
        >
          <h1 className="text-xl font-bold text-gray-800 text-center">
            관리자 로그인
          </h1>
          {authError && (
            <p className="text-red-600 text-sm bg-red-50 p-2 rounded-lg text-center">
              {authError}
            </p>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>
        <button
          onClick={() => {
            setAuthed(false);
            setPassword("");
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          로그아웃
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <TabButton active={tab === "stats"} onClick={() => setTab("stats")}>
          통계
        </TabButton>
        <TabButton active={tab === "list"} onClick={() => setTab("list")}>
          서명 목록
        </TabButton>
      </div>

      {tab === "stats" && <StatsPanel password={password} />}
      {tab === "list" && <ListPanel password={password} />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-green-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Stats Panel ---------- */

function StatsPanel({ password }: { password: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api({ password, action: "stats" }).then((res) => {
      setStats(res);
      setLoading(false);
    });
  }, [password]);

  if (loading) return <LoadingSkeleton />;
  if (!stats) return null;

  const maxDistrict = Math.max(...stats.districts.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-sm text-green-700 mb-1">총 서명 수</p>
        <p className="text-4xl font-bold text-green-800">
          {stats.total.toLocaleString()}
        </p>
      </div>

      {/* District breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">지역별 현황</h3>
        <div className="space-y-3">
          {stats.districts.map((d) => (
            <div key={d.district}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{d.district}</span>
                <span className="font-medium">{d.count}명</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(d.count / maxDistrict) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily trend */}
      {stats.daily.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">일별 서명 추이</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">날짜</th>
                  <th className="py-2 pr-4">서명 수</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {stats.daily.map((d) => {
                  const maxDaily = Math.max(
                    ...stats.daily.map((x) => x.count),
                    1
                  );
                  return (
                    <tr key={d.date} className="border-b border-gray-50">
                      <td className="py-2 pr-4 text-gray-700">{d.date}</td>
                      <td className="py-2 pr-4 font-medium">{d.count}</td>
                      <td className="py-2 w-1/2">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-400 rounded-full"
                            style={{
                              width: `${(d.count / maxDaily) * 100}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- List Panel ---------- */

function ListPanel({ password }: { password: string }) {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    const res = await api({ password, action: "list", page, search });
    setData(res);
    setLoading(false);
  }, [password, page, search]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  async function handleExport() {
    setExporting(true);
    const res = await api({ password, action: "export" });
    if (res.signatures) {
      const headers = [
        "이름",
        "이메일",
        "행정구역",
        "아파트",
        "동",
        "한마디",
        "유입경로",
        "서명일시",
      ];
      const rows = res.signatures.map((s: Signature) => [
        s.name,
        s.email,
        s.district,
        s.apartment,
        s.dong,
        s.comment || "",
        s.source || "",
        s.created_at,
      ]);

      const BOM = "\uFEFF";
      const csv =
        BOM +
        [headers, ...rows].map((r: string[]) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `서명목록_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setExporting(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" 서명을 삭제하시겠습니까?`)) return;
    await api({ password, action: "delete", id });
    fetchList();
  }

  return (
    <div className="space-y-4">
      {/* Search & Export */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="이름, 이메일, 아파트, 한마디 검색..."
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
        />
        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-4 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {exporting ? "내보내는 중..." : "CSV 다운로드"}
        </button>
      </div>

      {/* Results info */}
      {data && (
        <p className="text-sm text-gray-500">
          총 {data.total.toLocaleString()}건
          {search && ` (검색: "${search}")`}
        </p>
      )}

      {/* Table */}
      {loading ? (
        <LoadingSkeleton />
      ) : data && data.signatures.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">이름</th>
                <th className="px-4 py-3 font-medium">이메일</th>
                <th className="px-4 py-3 font-medium">행정구역</th>
                <th className="px-4 py-3 font-medium">아파트</th>
                <th className="px-4 py-3 font-medium">동</th>
                <th className="px-4 py-3 font-medium">한마디</th>
                <th className="px-4 py-3 font-medium">유입</th>
                <th className="px-4 py-3 font-medium">일시</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.signatures.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{s.name}</td>
                  <td className="px-4 py-3 text-gray-500">{s.email}</td>
                  <td className="px-4 py-3">
                    <DistrictBadge district={s.district} />
                  </td>
                  <td className="px-4 py-3">{s.apartment}</td>
                  <td className="px-4 py-3">{s.dong}</td>
                  <td className="px-4 py-3 max-w-[200px] truncate text-gray-500">
                    {s.comment || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {s.source || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {formatDate(s.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(s.id, s.name)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          {search ? "검색 결과가 없습니다." : "아직 서명이 없습니다."}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-30 hover:bg-gray-50"
          >
            이전
          </button>
          <span className="text-sm text-gray-600">
            {page} / {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page >= data.totalPages}
            className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-30 hover:bg-gray-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function DistrictBadge({ district }: { district: string }) {
  const color =
    district === "하남시"
      ? "bg-green-100 text-green-700"
      : district === "성남시"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-teal-100 text-teal-700";
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>
      {district}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-100 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}
