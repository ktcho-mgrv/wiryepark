"use client";

import { useState } from "react";

const SHARE_TITLE = "위례 시민공원 서명";
const SHARE_TEXT =
  "93만㎡ 성남골프클럽을 12만 위례 시민의 공원으로! 서명으로 함께해주세요.";

function getShareUrl(source: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}?from=${source}`;
}

export function ShareButtons({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  function handleKakaoShare() {
    const url = getShareUrl("kakao");
    // 카카오톡 커스텀 스킴 — 텍스트 공유
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}&text=${encodeURIComponent(SHARE_TEXT)}`;

    // 모바일에서는 Web Share API 우선 (카카오톡 포함)
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
      return;
    }

    // 데스크탑 — 새 창
    window.open(kakaoUrl, "_blank", "width=480,height=640");
  }

  async function handleCopyLink() {
    const url = getShareUrl("link");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <button
        onClick={handleKakaoShare}
        className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-6 py-3 rounded-xl hover:bg-[#FDD800] transition-colors"
      >
        <KakaoIcon />
        카카오톡으로 공유
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon />
            복사됨!
          </>
        ) : (
          <>
            <LinkIcon />
            링크 복사
          </>
        )}
      </button>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.786 5.108 4.477 6.449-.177.663-.64 2.405-.733 2.78-.115.465.17.458.358.333.148-.099 2.354-1.6 3.31-2.248.188.027.378.04.57.054A10.4 10.4 0 0012 18.382c5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
