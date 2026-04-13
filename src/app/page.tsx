import Link from "next/link";
import { DdayCounter } from "@/components/DdayCounter";
import { SignatureCounter } from "@/components/SignatureCounter";
import {
  WIRYE_POPULATION,
  GOLF_PROJECT_COST,
  GOLF_PAYBACK_YEARS,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <DdayCounter />
          <h1 className="mt-6 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            93만㎡, 소수의 골프장이 아닌
            <br />
            <span className="text-green-700">12만 위례 시민의 공원으로</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            성남골프클럽 부지에 {GOLF_PROJECT_COST.toLocaleString()}억 원 골프장 대신,{" "}
            {WIRYE_POPULATION.toLocaleString()}명 모두가 누리는 시민공원을 만들어주세요.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign"
              className="bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              지금 서명하기
            </Link>
            <Link
              href="/why"
              className="bg-white text-green-700 text-lg font-semibold px-8 py-4 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors"
            >
              왜 공원인가
            </Link>
          </div>
        </div>
      </section>

      {/* Size Comparison */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">얼마나 넓은 땅인가요?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ComparisonCard title="SGC 부지" value="93.1만㎡" description="성남골프클럽 전체 면적" highlight />
            <ComparisonCard title="여의도 면적의" value="약 1/3" description="여의도 전체 면적 290만㎡" />
            <ComparisonCard title="위례호수공원의" value="약 3배" description="위례호수공원 대비 규모" />
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {GOLF_PROJECT_COST.toLocaleString()}억 골프장, 숫자로 보면
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NumberCard
              number={`${GOLF_PAYBACK_YEARS}년`}
              label="투자금 회수 기간"
              sub="대중형 골프장 평균 영업이익 기준"
              color="text-red-600"
            />
            <NumberCard number="83%" label="골프를 치지 않는 시민" sub="성인 기준, 골프 비이용자 비율" color="text-amber-600" />
            <NumberCard number="16개월" label="골프 소비 연속 감소" sub="2023년부터 골프 소비지출 하락세" color="text-orange-600" />
          </div>
        </div>
      </section>

      {/* Signature Counter */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">서명 현황</h2>
          <SignatureCounter />
          <div className="mt-6 text-center">
            <Link href="/sign" className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors">
              나도 서명하기
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">성남골프클럽 타임라인</h2>
          <div className="space-y-0">
            <TimelineItem year="1993" text="미8군 전용 골프장으로 개장" />
            <TimelineItem year="2017" text="미군 평택 이전, 골프장 운영 중단" />
            <TimelineItem year="2021" text="국방부에 공식 반환" />
            <TimelineItem year="2024.6" text="토양오염 정화 착수 (1급 발암물질 검출)" />
            <TimelineItem year="2026.6.3" text="지방선거 — 시민의 선택" highlight />
            <TimelineItem year="?" text="시민공원? 골프장? 당신이 결정합니다" highlight />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">위례의 미래를 함께 만들어요</h2>
          <p className="text-green-100 text-lg mb-8">하남, 성남, 송파 — 위례에 사는 모든 이웃의 목소리가 필요합니다.</p>
          <Link href="/sign" className="inline-block bg-white text-green-700 text-lg font-bold px-10 py-4 rounded-xl hover:bg-green-50 transition-colors">
            서명으로 함께하기
          </Link>
        </div>
      </section>
    </>
  );
}

function ComparisonCard({ title, value, description, highlight }: { title: string; value: string; description: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-6 text-center ${highlight ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 border border-gray-200"}`}>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-3xl font-bold ${highlight ? "text-green-700" : "text-gray-800"}`}>{value}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}

function NumberCard({ number, label, sub, color }: { number: string; label: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <p className={`text-4xl font-bold ${color}`}>{number}</p>
      <p className="text-gray-800 font-medium mt-2">{label}</p>
      <p className="text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function TimelineItem({ year, text, highlight }: { year: string; text: string; highlight?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 ${highlight ? "bg-green-600" : "bg-gray-300"}`} />
        <div className="w-0.5 h-8 bg-gray-200" />
      </div>
      <div className="pb-6">
        <p className={`text-sm font-semibold ${highlight ? "text-green-700" : "text-gray-500"}`}>{year}</p>
        <p className={highlight ? "text-gray-900 font-medium" : "text-gray-600"}>{text}</p>
      </div>
    </div>
  );
}
