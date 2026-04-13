"use client";

import { useState } from "react";
import Link from "next/link";
import { signatureSchema, type SignatureFormData } from "@/lib/validation";
import { districts, apartmentsByDistrict, type District } from "@/lib/apartments";
import { supabase } from "@/lib/supabase";
import { ShareButtons } from "@/components/ShareButtons";

export function SignForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    district: "" as District | "",
    apartment: "",
    customApartment: "",
    dong: "",
    comment: "",
    agreedPrivacy: false,
  });
  const [useCustomApartment, setUseCustomApartment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const apartments = form.district ? apartmentsByDistrict[form.district] : [];

  function handleDistrictChange(value: string) {
    setForm((prev) => ({
      ...prev,
      district: value as District,
      apartment: "",
      customApartment: "",
    }));
    setUseCustomApartment(false);
  }

  function handleApartmentChange(value: string) {
    if (value === "__custom__") {
      setUseCustomApartment(true);
      setForm((prev) => ({ ...prev, apartment: "", customApartment: "" }));
    } else {
      setUseCustomApartment(false);
      setForm((prev) => ({ ...prev, apartment: value, customApartment: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const data: SignatureFormData = {
      name: form.name.trim(),
      email: form.email.trim(),
      district: form.district as District,
      apartment: useCustomApartment
        ? form.customApartment.trim()
        : form.apartment,
      dong: form.dong.trim(),
      comment: form.comment.trim() || undefined,
      agreedPrivacy: form.agreedPrivacy as true,
    };

    const result = signatureSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("signatures").insert({
        name: data.name,
        email: data.email,
        district: data.district,
        apartment: data.apartment,
        dong: data.dong,
        comment: data.comment || null,
        source: (() => {
          if (typeof window === "undefined") return null;
          const ALLOWED = ["kakao", "naver", "instagram", "flyer", "qr", "neighbor"];
          const raw = new URLSearchParams(window.location.search).get("from");
          return raw && ALLOWED.includes(raw) ? raw : null;
        })(),
        agreed_privacy: true,
      });
      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "이미 서명에 참여한 이메일입니다." });
        } else {
          setErrors({ form: "서명 등록 중 오류가 발생했습니다. 다시 시도해주세요." });
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ form: "서명 등록 중 오류가 발생했습니다. 다시 시도해주세요." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🌳</div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">감사합니다!</h2>
        <p className="text-gray-600 mb-6">
          위례 시민공원을 위한 소중한 서명이 등록되었습니다.
        </p>
        <ShareButtons className="justify-center mb-4" />
        <Link href="/dashboard" className="text-green-700 font-medium hover:underline">
          서명 현황 보기
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errors.form}</p>
      )}

      <Field label="이름" error={errors.name} required>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="홍길동"
          className="input"
        />
      </Field>

      <Field label="이메일" error={errors.email} required>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="email@example.com"
          className="input"
        />
        <p className="text-xs text-gray-400 mt-1">이메일당 1회 서명 가능합니다</p>
      </Field>

      <Field label="행정구역" error={errors.district} required>
        <select
          value={form.district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="input"
        >
          <option value="">선택하세요</option>
          {districts.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </Field>

      {form.district && (
        <Field label="아파트" error={errors.apartment} required>
          <select
            value={useCustomApartment ? "__custom__" : form.apartment}
            onChange={(e) => handleApartmentChange(e.target.value)}
            className="input"
          >
            <option value="">선택하세요</option>
            {apartments.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value="__custom__">직접 입력</option>
          </select>
          {useCustomApartment && (
            <input
              type="text"
              value={form.customApartment}
              onChange={(e) =>
                setForm((p) => ({ ...p, customApartment: e.target.value }))
              }
              placeholder="아파트/빌라/오피스텔 이름"
              className="input mt-2"
            />
          )}
        </Field>
      )}

      <Field label="거주 동" error={errors.dong} required>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={form.dong}
            onChange={(e) => setForm((p) => ({ ...p, dong: e.target.value }))}
            placeholder="101"
            className="input w-24"
            inputMode="numeric"
          />
          <span className="text-gray-500">동</span>
        </div>
      </Field>

      <Field label="한마디 (선택)" error={errors.comment}>
        <textarea
          value={form.comment}
          onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
          placeholder="공원이 필요한 이유를 한마디로!"
          rows={2}
          maxLength={200}
          className="input resize-none"
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agreedPrivacy}
          onChange={(e) =>
            setForm((p) => ({ ...p, agreedPrivacy: e.target.checked }))
          }
          className="mt-1 w-5 h-5 text-green-600 rounded border-gray-300"
        />
        <span className="text-sm text-gray-600">
          <Link href="/privacy" target="_blank" className="text-green-700 underline">
            개인정보 수집·이용
          </Link>
          에 동의합니다.
        </span>
      </label>
      {errors.agreedPrivacy && (
        <p className="text-red-500 text-sm">{errors.agreedPrivacy}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white text-lg font-semibold py-4 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "등록 중..." : "서명하기"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <style jsx global>{`
        .input {
          display: block;
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.15s;
          outline: none;
          background: white;
        }
        .input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
      `}</style>
    </div>
  );
}
