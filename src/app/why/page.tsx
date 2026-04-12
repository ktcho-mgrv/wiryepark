import type { Metadata } from "next";
import Link from "next/link";
import {
  GOLF_PROJECT_COST,
  GOLF_PAYBACK_YEARS,
  GOLF_AVG_ANNUAL_PROFIT,
  PARK_ESTIMATED_COST,
  SGC_AREA_SQM,
  WIRYE_POPULATION,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "왜 공원인가",
  description: "8,700억 골프장 계획의 문제점과 시민공원이 더 나은 이유.",
};

export default function WhyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Intro */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {GOLF_PROJECT_COST.toLocaleString()}억 골프장,
          <br />
          <span className="text-red-600">누구를 위한 계획인가요?</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          하남시는 성남골프클럽 부지를 퍼블릭 골프장으로 재개장하려 합니다.
          {GOLF_PROJECT_COST.toLocaleString()}억 원이라는 사업비.
          이 숫자들이 말해주는 것을 함께 살펴봅시다.
        </p>
      </section>

      {/* Question 1 */}
      <QuestionSection
        number={1}
        question="투자금을 회수할 수 있나요?"
        color="red"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatBox
            label="대중형 18홀 평균 연 영업이익"
            value={`${GOLF_AVG_ANNUAL_PROFIT}억 원`}
            sub="레저백서 2025, 2024년 기준"
          />
          <StatBox
            label="투자금 회수 기간"
            value={`약 ${GOLF_PAYBACK_YEARS}년`}
            sub={`${GOLF_PROJECT_COST.toLocaleString()}억 ÷ ${GOLF_AVG_ANNUAL_PROFIT}억 = ${GOLF_PAYBACK_YEARS}년`}
            highlight
          />
        </div>
        <div className="bg-red-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold text-red-800">이것도 낙관적인 숫자입니다:</p>
          <ul className="text-red-700 space-y-1 text-sm">
            <li>
              2025년 상반기 골프장 영업이익 <strong>전년 대비 33.4% 급감</strong> (이 추세면 회수 147년)
            </li>
            <li>
              골프 소비지출 <strong>16개월 연속 감소</strong> (한국관광공사)
            </li>
            <li>
              전국 골프장 총 매출 2년간 <strong>14% 감소</strong> (9.9조 → 8.5조)
            </li>
            <li>
              전국 <strong>30~60개 골프장이 매물·부도</strong> 상태
            </li>
            <li>
              공영 골프장은 <strong>그린피 인하 압박</strong> → 민간 평균보다 수익 낮음
            </li>
          </ul>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          ※ {GOLF_PROJECT_COST.toLocaleString()}억 원에는 국방부 토지 매입비가 포함된 것으로 추정됩니다.
          토지비는 골프장이든 공원이든 동일하게 발생하지만, 핵심 질문은 변하지 않습니다:
          <strong> 운영 수익으로 이 투자를 회수할 수 있는가?</strong>
        </p>
      </QuestionSection>

      {/* Question 2 */}
      <QuestionSection
        number={2}
        question={`12만 시민 중 몇 명이 혜택을 받나요?`}
        color="amber"
      >
        <div className="flex flex-col items-center mb-6">
          {/* Person icons visualization */}
          <div className="grid grid-cols-10 gap-1 mb-4">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-sm ${
                  i < 17 ? "bg-amber-500" : "bg-gray-200"
                }`}
                title={i < 17 ? "골프 이용자" : "비이용자"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="inline-block w-3 h-3 bg-amber-500 rounded-sm mr-1" />
            골프 이용자 (17%)
            <span className="inline-block w-3 h-3 bg-gray-200 rounded-sm ml-3 mr-1" />
            비이용자 (83%)
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5">
          <p className="text-amber-900">
            성인의 <strong>83%는 골프를 전혀 치지 않습니다.</strong> 주말 1라운드
            비용은 그린피 + 카트비 + 캐디피 합산 <strong>30~35만 원</strong>.
          </p>
          <p className="text-amber-800 mt-2">
            세금으로 만든 시설이라면, <strong>100명 중 17명이 아닌 100명 모두가
            혜택</strong>을 받아야 하지 않을까요?
          </p>
        </div>
      </QuestionSection>

      {/* Question 3 */}
      <QuestionSection
        number={3}
        question="적자가 나면 누가 부담하나요?"
        color="orange"
      >
        <div className="bg-orange-50 rounded-xl p-5 space-y-3">
          <p className="text-orange-900">
            하남도시공사가 매입·운영하므로, 적자가 발생하면 <strong>하남시 재정 (= 시민 세금)</strong>으로
            보전해야 합니다.
          </p>
          <p className="text-orange-800">
            전국적으로 골프장 수익성이 급락하는 추세에서, 공영 퍼블릭 골프장이
            흑자를 유지할 수 있을까요? 2025년 감사원 적발 사례처럼 <strong>세금 감면을 받고도
            조건을 위반</strong>한 골프장이 10곳이나 됩니다.
          </p>
          <p className="text-orange-800 font-semibold">
            결국 골프를 치지 않는 83%의 시민이, 17%를 위한 시설의 적자를 부담하게 됩니다.
          </p>
        </div>
      </QuestionSection>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          같은 땅, 다른 선택
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-left text-gray-500 font-medium">항목</th>
                <th className="py-3 px-4 text-center text-gray-500 font-medium">퍼블릭 골프장</th>
                <th className="py-3 px-4 text-center text-green-700 font-bold">시민공원</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <CompRow
                label="추정 개발비"
                golf={`${GOLF_PROJECT_COST.toLocaleString()}억 원`}
                park={`약 ${PARK_ESTIMATED_COST}~900억 원`}
                parkWin
              />
              <CompRow
                label="수혜 대상"
                golf="골프 이용자 (~17%)"
                park={`${WIRYE_POPULATION.toLocaleString()}명 전체 (100%)`}
                parkWin
              />
              <CompRow
                label="이용 비용"
                golf="주말 30~35만 원"
                park="무료"
                parkWin
              />
              <CompRow
                label="투자 회수"
                golf={`${GOLF_PAYBACK_YEARS}년 (사실상 불가)`}
                park="공공 인프라 (회수 개념 아님)"
                parkWin
              />
              <CompRow
                label="환경 효과"
                golf="농약·살충제 사용"
                park="미세먼지 흡착, 열섬 완화"
                parkWin
              />
              <CompRow
                label="부동산 효과"
                golf="이용자 한정 프리미엄"
                park="서울숲: 부지가치 6.7배 상승"
                parkWin
              />
              <CompRow
                label="적자 시"
                golf="세금으로 보전"
                park="유지비만 발생"
                parkWin
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">골프장에서 공원으로 — 성공 사례</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CaseCard
            title="노을공원 (서울)"
            before="난지 대중골프장"
            after="시민공원·캠핑장"
            duration="약 4년"
            key_point="시민 캠페인으로 전환 결정"
          />
          <CaseCard
            title="용산공원 (서울)"
            before="미군기지"
            after="국가공원 (조성 중)"
            duration="30년+"
            key_point="누적 방문 180만 명"
          />
          <CaseCard
            title="컬리파크 (미국)"
            before="민간 골프장"
            after="커뮤니티 공원"
            duration="약 16년"
            key_point="시민 크라우드펀딩 성공"
          />
        </div>
      </section>

      {/* Key Message */}
      <section className="bg-green-50 rounded-2xl p-8 text-center mb-16">
        <p className="text-xl md:text-2xl font-bold text-green-800 leading-relaxed">
          세금은 가장 많은 시민에게 돌아가야 합니다.
          <br />
          <span className="text-green-600">
            {SGC_AREA_SQM.toLocaleString()}㎡의 땅이 12만 시민 모두의 것이 될 수 있습니다.
          </span>
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h2>
        <div className="space-y-4">
          <FAQ
            q="골프장도 시민을 위한 거 아닌가요?"
            a="성인의 17%만 이용하며, 주말 1회 35만 원입니다. 세금으로 만든 시설이라면 100%가 혜택받는 방식이어야 합니다."
          />
          <FAQ
            q="공원으로 만들면 비용은 얼마나 드나요?"
            a={`국토부 표준조성비 기준 ㎡당 8.8만 원 × ${(SGC_AREA_SQM / 10000).toFixed(0)}만㎡ = 약 ${PARK_ESTIMATED_COST}억 원. 골프장 추진비의 약 1/10 수준입니다.`}
          />
          <FAQ
            q="SGC는 하남시 소유인가요?"
            a="아닙니다. 국방부 소유입니다. 하남도시공사가 매입을 추진 중이나 아직 미확정 상태입니다."
          />
          <FAQ
            q="다른 지역(성남, 송파) 주민도 관련이 있나요?"
            a="네. 93만㎡ 부지는 위례신도시 전체에 영향을 미칩니다. SGC는 하남시 관할이지만, 하남·성남·송파 12만 시민 모두의 문제입니다."
          />
          <FAQ
            q="퍼블릭 골프장이 돈을 벌 수 있지 않나요?"
            a={`대중형 평균 연 영업이익 ${GOLF_AVG_ANNUAL_PROFIT}억 원 기준, ${GOLF_PROJECT_COST.toLocaleString()}억 원 회수에 ${GOLF_PAYBACK_YEARS}년이 걸립니다. 골프 매출은 3년째 감소 중이며, 전국 60개 이상 골프장이 매물 상태입니다.`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          href="/sign"
          className="inline-block bg-green-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
        >
          서명으로 함께하기
        </Link>
      </section>
    </div>
  );
}

function QuestionSection({
  number,
  question,
  color,
  children,
}: {
  number: number;
  question: string;
  color: "red" | "amber" | "orange";
  children: React.ReactNode;
}) {
  const colors = {
    red: "text-red-600 bg-red-100",
    amber: "text-amber-600 bg-amber-100",
    orange: "text-orange-600 bg-orange-100",
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${colors[color]}`}
        >
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{question}</h2>
      </div>
      {children}
    </section>
  );
}

function StatBox({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 text-center ${
        highlight ? "bg-red-50 border-2 border-red-200" : "bg-gray-50 border border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${highlight ? "text-red-600" : "text-gray-800"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function CompRow({
  label,
  golf,
  park,
  parkWin,
}: {
  label: string;
  golf: string;
  park: string;
  parkWin?: boolean;
}) {
  return (
    <tr>
      <td className="py-3 px-4 text-gray-700 font-medium">{label}</td>
      <td className="py-3 px-4 text-center text-gray-500">{golf}</td>
      <td className={`py-3 px-4 text-center font-medium ${parkWin ? "text-green-700" : ""}`}>
        {park}
      </td>
    </tr>
  );
}

function CaseCard({
  title,
  before,
  after,
  duration,
  key_point,
}: {
  title: string;
  before: string;
  after: string;
  duration: string;
  key_point: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <div className="text-sm space-y-1 text-gray-600">
        <p>
          <span className="text-gray-400">전:</span> {before}
        </p>
        <p>
          <span className="text-gray-400">후:</span>{" "}
          <span className="text-green-700 font-medium">{after}</span>
        </p>
        <p>
          <span className="text-gray-400">기간:</span> {duration}
        </p>
      </div>
      <p className="mt-3 text-sm text-green-700 font-medium">{key_point}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-gray-50 rounded-xl">
      <summary className="cursor-pointer px-5 py-4 font-medium text-gray-800 flex items-center justify-between">
        {q}
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <p className="px-5 pb-4 text-gray-600 text-sm">{a}</p>
    </details>
  );
}
