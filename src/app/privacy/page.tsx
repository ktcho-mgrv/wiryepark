import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "위례 시민공원 캠페인 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">개인정보 처리방침</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-900 space-y-2">
          <p className="font-semibold">
            본 사이트는 2026년 지방선거에서 후보자들에게 성남골프클럽(SGC) 부지의
            시민공원 조성을 요구하기 위한 비영리 시민 캠페인입니다.
          </p>
          <p>
            어떠한 상업적 목적도 없으며, 서명에 필요한 최소한의 정보만을 수집합니다.
            수집된 정보는 오직 후보자들에게 시민의 뜻을 전달하는 용도로만 사용되고,
            개별 인적사항은 비식별 처리하여 전달합니다.
            선거 종료 후 3개월 이내에 모든 개인정보를 복구 불가능한 방법으로 파기합니다.
          </p>
        </div>

        <p className="text-gray-600">
          위례 시민공원 추진 캠페인(이하 &quot;캠페인&quot;)은 개인정보보호법에 따라
          이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하게
          처리하기 위하여 다음과 같은 처리방침을 두고 있습니다.
        </p>

        <Section title="제1조 (개인정보의 수집 및 이용 목적)">
          <p>캠페인은 다음의 목적으로 개인정보를 수집·이용합니다.</p>
          <ul>
            <li>성남골프클럽(SGC) 시민공원 조성 찬성 서명 수집</li>
            <li>서명 참여자 확인 및 중복 방지</li>
            <li>캠페인 진행 사항 안내 (이메일)</li>
          </ul>
        </Section>

        <Section title="제2조 (수집하는 개인정보 항목)">
          <ul>
            <li><strong>필수 항목:</strong> 이름, 이메일, 행정구역, 아파트 이름, 거주 동</li>
            <li><strong>선택 항목:</strong> 한마디 의견</li>
          </ul>
        </Section>

        <Section title="제3조 (개인정보의 보유 및 이용 기간)">
          <ul>
            <li>2026년 6월 지방선거 종료 후 <strong>3개월 이내 파기</strong></li>
            <li>정보주체가 동의 철회를 요청하는 경우 <strong>즉시 파기</strong></li>
          </ul>
        </Section>

        <Section title="제4조 (개인정보의 제3자 제공)">
          <p>원칙적으로 제3자에게 제공하지 않습니다.</p>
          <p>
            다만, 하남시장 후보 또는 하남시에 서명 수(집계)를 전달할 때
            개별 인적사항은 <strong>비식별 처리</strong>합니다.
          </p>
        </Section>

        <Section title="제5조 (개인정보의 파기)">
          <p>
            보유 기간 만료 시 전자 파일은 복구 불가능한 방법으로 삭제하며,
            데이터베이스에서 완전 삭제 처리합니다.
          </p>
        </Section>

        <Section title="제6조 (정보주체의 권리)">
          <p>이용자는 다음 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정·삭제 요구</li>
            <li>개인정보 처리정지 요구</li>
          </ul>
          <p>
            요청 방법:{" "}
            <a href="mailto:contact@wiryevote.kr" className="text-green-700 underline">
              contact@wiryevote.kr
            </a>
            로 연락
          </p>
        </Section>

        <Section title="제7조 (개인정보 보호 책임자)">
          <ul>
            <li>성명: [캠페인 운영자 이름]</li>
            <li>
              연락처:{" "}
              <a href="mailto:contact@wiryevote.kr" className="text-green-700 underline">
                contact@wiryevote.kr
              </a>
            </li>
          </ul>
        </Section>

        <Section title="제8조 (개인정보 안전성 확보 조치)">
          <ul>
            <li>SSL/TLS 암호화 통신 적용</li>
            <li>데이터베이스 접근 제어 (Row Level Security) 적용</li>
            <li>관리자 계정 2단계 인증 사용</li>
          </ul>
        </Section>

        <p className="text-gray-400 text-xs mt-8">
          본 방침은 2026년 4월 13일부터 시행됩니다.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-2">{title}</h2>
      <div className="text-gray-600 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
