"use client";

import { useEffect, useState } from "react";
import { ELECTION_DATE } from "@/lib/constants";

export function DdayCounter() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const diff = ELECTION_DATE.getTime() - now.getTime();
    setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  if (daysLeft === null) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      선거일까지 D-{daysLeft}
    </div>
  );
}
