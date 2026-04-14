import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>위례 시민공원 추진 캠페인</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-700">
              개인정보 처리방침
            </Link>
            <a href="mailto:contact@wiryevote.kr" className="hover:text-gray-700">
              문의
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4 space-y-1">
          <p>
            본 사이트는 2026년 지방선거에서 후보자들에게 성남골프클럽 부지의 시민공원 조성을 요구하기 위한
            비영리 시민 캠페인입니다. 어떠한 상업적 목적도 없으며, 특정 정당이나 후보를 지지·반대하지 않습니다.
          </p>
          <p>
            수집된 서명은 후보자들에게 시민의 뜻을 전달하는 용도로만 사용되며,
            선거 종료 후 3개월 이내에 전량 파기됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
