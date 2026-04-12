import type { Metadata } from "next";
import Link from "next/link";
import { SignatureCounter } from "@/components/SignatureCounter";
import { ApartmentRanking } from "./ApartmentRanking";
import { RecentComments } from "./RecentComments";

export const metadata: Metadata = {
  title: "서명 현황",
  description: "위례 시민공원 서명 참여 현황을 확인하세요.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">서명 현황</h1>
      <p className="text-center text-gray-500 mb-8">
        하남 · 성남 · 송파 — 위례 시민들의 참여 현황
      </p>

      <div className="max-w-md mx-auto mb-12">
        <SignatureCounter />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">아파트별 참여 순위</h2>
        <ApartmentRanking />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">시민의 한마디</h2>
        <RecentComments />
      </section>

      <div className="text-center">
        <Link
          href="/sign"
          className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors"
        >
          나도 서명하기
        </Link>
      </div>
    </div>
  );
}
