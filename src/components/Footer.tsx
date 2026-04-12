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
            <a href="mailto:contact@wiryepark.kr" className="hover:text-gray-700">
              문의
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          본 캠페인은 특정 정당이나 후보를 지지·반대하지 않으며, 정책 이슈에 대한 시민 의견 수렴을 목적으로 합니다.
        </p>
      </div>
    </footer>
  );
}
