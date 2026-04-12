import type { Metadata } from "next";
import { SignForm } from "./SignForm";

export const metadata: Metadata = {
  title: "서명하기",
  description: "성남골프클럽을 위례 시민공원으로! 서명으로 함께해주세요.",
};

export default function SignPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">위례 시민공원, 함께 만들어요</h1>
        <p className="text-gray-500 mt-2">
          하남 · 성남 · 송파 — 위례에 사는 모든 이웃의 서명이 힘이 됩니다.
        </p>
      </div>
      <SignForm />
    </div>
  );
}
