import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "후보 입장 비교",
  description: "2026 하남시장 후보들의 성남골프클럽 관련 입장을 비교합니다.",
};

const candidates = [
  {
    name: "이현재",
    party: "국민의힘",
    role: "현직 하남시장",
    stance: "골프장" as const,
    detail:
      "퍼블릭 골프장 '위례골프장'으로 재개장 추진. 하남도시공사가 국방부로부터 부지 매입 후 운영 계획. 예상 사업비 약 8,700억 원.",
  },
  {
    name: "서정완",
    party: "더불어민주당",
    role: "이재명 대통령 정책선임팀장",
    stance: "미발표" as const,
    detail: null,
  },
  {
    name: "강병덕",
    party: "더불어민주당",
    role: "민주당 대표 정책특보",
    stance: "미발표" as const,
    detail:
      "환경보전 성향. K스타월드 부지(미사섬)를 '국가정원'으로 조성해야 한다는 입장을 밝힌 바 있음. SGC 관련 공식 입장은 미발표.",
  },
  {
    name: "오후석",
    party: "더불어민주당",
    role: "전 경기도 제2행정부지사",
    stance: "미발표" as const,
    detail: null,
  },
];

const stanceColors = {
  공원: "bg-green-100 text-green-800",
  골프장: "bg-red-100 text-red-800",
  미발표: "bg-gray-100 text-gray-600",
  기타: "bg-yellow-100 text-yellow-800",
};

export default function CandidatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        2026 하남시장 후보, SGC에 대한 입장은?
      </h1>
      <p className="text-center text-gray-500 mb-4">
        SGC 부지는 하남시 관할이므로 하남시장의 의지가 핵심입니다.
      </p>
      <p className="text-center text-sm text-gray-400 mb-8">
        성남·송파 위례 주민도 이 부지의 활용에 직접적 영향을 받습니다.
      </p>

      {/* Election Info */}
      <div className="bg-blue-50 rounded-xl p-4 text-center mb-8">
        <p className="text-blue-800 font-medium">
          투표일: <strong>2026년 6월 3일 (수)</strong> | 사전투표: 5월 29일(금)~30일(토)
        </p>
      </div>

      {/* Hanam Mayor Candidates */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">하남시장 후보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((c) => (
            <CandidateCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* Other mayors */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">성남시장 · 송파구청장 후보 입장</h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-500">
            SGC는 하남시 관할이나, 위례 전체에 영향을 미치는 이슈로
            <br />
            인접 지자체장의 입장도 중요합니다.
          </p>
          <p className="text-sm text-gray-400 mt-2">추후 업데이트 예정</p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 text-center">
        <p>
          본 페이지는 특정 후보를 지지하거나 반대하지 않으며,
          <br />
          공개된 자료와 보도를 기반으로 각 후보의 정책 입장만을 정리합니다.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          마지막 업데이트: 2026년 4월 | 각 후보 캠프에 입장 확인 요청 중
        </p>
      </div>
    </div>
  );
}

function CandidateCard({
  name,
  party,
  role,
  stance,
  detail,
}: {
  name: string;
  party: string;
  role: string;
  stance: "공원" | "골프장" | "미발표" | "기타";
  detail: string | null;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">
            {party} · {role}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stanceColors[stance]}`}>
          {stance}
        </span>
      </div>
      {detail ? (
        <p className="text-sm text-gray-600">{detail}</p>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">
            공식 입장 미발표
          </p>
          <p className="text-green-700 text-sm font-medium mt-1">
            시민 여러분의 질문이 필요합니다
          </p>
        </div>
      )}
    </div>
  );
}
