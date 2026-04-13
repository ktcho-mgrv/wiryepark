import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "후보 입장 비교",
  description:
    "2026 지방선거 하남시장·성남시장·송파구청장 후보들의 성남골프클럽 관련 입장을 비교합니다.",
};

/* ─── 하남시장 후보 ─── */
const hanamCandidates = [
  {
    name: "이현재",
    party: "국민의힘",
    role: "현직 하남시장",
    status: "후보 확정",
    stance: "골프장" as const,
    detail:
      "퍼블릭 골프장 '위례골프장'으로 재개장 추진. 하남도시공사가 국방부로부터 부지 매입 후 운영 계획. 예상 사업비 약 8,700억 원. 에릭 트럼프(트럼프 그룹)와 글로벌 호텔·골프장 개발 협력 타진.",
  },
  {
    name: "서정완",
    party: "더불어민주당",
    role: "전 대통령비서실 행정관",
    status: "경선 결선 진출 (4/19~20 투표)",
    stance: "미발표" as const,
    detail:
      "SGC 직접 언급 없음. 이현재 시장의 골프장·K스타월드를 '전시성'이라 비판. 수도권 1호 국가정원 조성 공약으로 대안 제시.",
  },
  {
    name: "강병덕",
    party: "더불어민주당",
    role: "민주당 대표 정책특보",
    status: "경선 결선 진출 (4/19~20 투표)",
    stance: "기타" as const,
    detail:
      "해외 자본 중심이 아닌 공영개발을 통한 교통시설 확충과 시민 환원형 개발을 검토해야 한다는 입장. 교육시설 유치와 친환경 보존을 동시에 고려한 종합적 접근 필요성 언급.",
  },
  {
    name: "추민규",
    party: "새미래민주당",
    role: "전 경기도의원",
    status: "예비후보 등록",
    stance: "미발표" as const,
    detail: null,
  },
];

/* ─── 성남시장 후보 ─── */
const seongnamCandidates = [
  {
    name: "신상진",
    party: "국민의힘",
    role: "현직 성남시장 (4선 국회의원 출신)",
    status: "단수 공천 확정",
    stance: "미발표" as const,
    detail:
      "SGC 관련 공식 입장 없음. 위례 스토리박스 부지에 첨단기업 유치 및 문화·체육시설 공약.",
  },
  {
    name: "김병욱",
    party: "더불어민주당",
    role: "전 대통령실 정무비서관 (재선 국회의원 출신)",
    status: "후보 확정 (경선 승리)",
    stance: "미발표" as const,
    detail:
      "SGC 관련 공식 입장 없음. 위례 관련 '신사-위례-삼동선 조속 착공' 및 '지하철 8호선 판교 연장' 공약.",
  },
  {
    name: "장지화",
    party: "진보당",
    role: "진보당 공동대표",
    status: "예비후보 등록",
    stance: "미발표" as const,
    detail: null,
  },
];

/* ─── 송파구청장 후보 ─── */
const songpaCandidates = [
  {
    name: "서강석",
    party: "국민의힘",
    role: "현직 송파구청장",
    status: "후보 확정",
    stance: "미발표" as const,
    detail:
      "SGC 관련 공식 입장 없음. 위례 트램·위례신사선 등 교통 현안 해결 중심으로 접근.",
  },
  {
    name: "조재희",
    party: "더불어민주당",
    role: "전 한국폴리텍대학 이사장 (송파갑 지역위원장)",
    status: "경선 진행 중 (1위)",
    stance: "미발표" as const,
    detail: null,
  },
  {
    name: "박성수",
    party: "더불어민주당",
    role: "전 송파구청장 (민선 6·7기)",
    status: "경선 진행 중",
    stance: "미발표" as const,
    detail: null,
  },
  {
    name: "박용모",
    party: "더불어민주당",
    role: "전 송파구의회 의장",
    status: "경선 진행 중",
    stance: "미발표" as const,
    detail: null,
  },
  {
    name: "임동국",
    party: "더불어민주당",
    role: "전 송파구청 부구청장",
    status: "경선 진행 중",
    stance: "미발표" as const,
    detail: null,
  },
  {
    name: "안성용",
    party: "더불어민주당",
    role: "위례시민연대 대표",
    status: "경선 진행 중",
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

const stanceLabels = {
  공원: "공원 찬성",
  골프장: "골프장 유지",
  미발표: "미발표",
  기타: "조건부 검토",
};

export default function CandidatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        2026 지방선거, SGC(성남골프클럽)에 대한 후보 입장은?
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
          투표일: <strong>2026년 6월 3일 (수)</strong> | 사전투표: 5월
          29일(금)~30일(토)
        </p>
      </div>

      {/* ── 하남시장 ── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">하남시장 후보</h2>
        <p className="text-sm text-gray-500 mb-6">
          SGC 부지의 직접 관할 지자체 — 시장의 결정이 가장 큰 영향력을 가집니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hanamCandidates.map((c) => (
            <CandidateCard key={c.name} {...c} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          ※ 더불어민주당 하남시장 결선 투표 4/19~20 — 서정완 vs 강병덕. 최종
          후보 확정 후 업데이트 예정
        </p>
      </section>

      {/* ── 성남시장 ── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">성남시장 후보</h2>
        <p className="text-sm text-gray-500 mb-6">
          성남시 수정구 위례동 주민 약 45,826명이 SGC 부지 활용에 직접 영향을
          받습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seongnamCandidates.map((c) => (
            <CandidateCard key={c.name} {...c} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          ※ 민주당 성남시장 후보 김병욱 확정 (4/13~14 경선) — 김병욱 vs
          신상진 대결 구도
        </p>
      </section>

      {/* ── 송파구청장 ── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">송파구청장 후보</h2>
        <p className="text-sm text-gray-500 mb-6">
          서울 송파구 위례동 주민 약 45,083명이 SGC 부지 활용에 직접 영향을
          받습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {songpaCandidates.map((c) => (
            <CandidateCard key={c.name} {...c} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          ※ 더불어민주당 송파구청장 5인 경선 진행 중 — 최종 후보 확정 후
          업데이트 예정
        </p>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 text-center">
        <p>
          본 페이지는 특정 후보를 지지하거나 반대하지 않으며,
          <br />
          공개된 자료와 보도를 기반으로 각 후보의 정책 입장만을 정리합니다.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          마지막 업데이트: 2026년 4월 13일 | 각 캠프에서는 SGC 관련 구체적인
          공약이 있다면 공식 공약에 포함해 주세요
        </p>
      </div>
    </div>
  );
}

function CandidateCard({
  name,
  party,
  role,
  status,
  stance,
  detail,
}: {
  name: string;
  party: string;
  role: string;
  status: string;
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
          <p className="text-xs text-gray-400 mt-0.5">{status}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${stanceColors[stance]}`}
        >
          {stanceLabels[stance]}
        </span>
      </div>
      {detail ? (
        <p className="text-sm text-gray-600">{detail}</p>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">공식 입장 미발표</p>
          <p className="text-green-700 text-sm font-medium mt-1">
            시민 여러분의 질문이 필요합니다
          </p>
        </div>
      )}
    </div>
  );
}
