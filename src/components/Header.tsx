"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";

const navItems = [
  { href: "/why", label: "왜 공원인가" },
  { href: "/sign", label: "서명하기" },
  { href: "/dashboard", label: "서명 현황" },
  { href: "/candidates", label: "후보 입장" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-green-700 text-lg">
          <span aria-hidden>🌳</span>
          <span>{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-green-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/sign"
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            서명 참여
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="p-4">
            <Link
              href="/sign"
              className="block text-center bg-green-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-green-700"
              onClick={() => setOpen(false)}
            >
              서명 참여
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
