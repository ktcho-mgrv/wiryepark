import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wirye2026!admin";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, action, page = 1, search = "", id } = body;

  if (password !== ADMIN_PASSWORD) return unauthorized();

  if (action === "verify") {
    return NextResponse.json({ ok: true });
  }

  if (action === "stats") {
    const [totalRes, districtRes, dailyRes] = await Promise.all([
      supabaseAdmin.from("signatures").select("*", { count: "exact", head: true }),
      supabaseAdmin.rpc("get_district_counts"),
      supabaseAdmin.rpc("get_daily_counts"),
    ]);

    // Fallback if RPCs don't exist — use direct queries
    let districtCounts = districtRes.data;
    let dailyCounts = dailyRes.data;

    if (districtRes.error) {
      const { data } = await supabaseAdmin
        .from("signatures")
        .select("district");
      const counts: Record<string, number> = {};
      data?.forEach((r) => {
        counts[r.district] = (counts[r.district] || 0) + 1;
      });
      districtCounts = Object.entries(counts).map(([district, count]) => ({
        district,
        count,
      }));
    }

    if (dailyRes.error) {
      const { data } = await supabaseAdmin
        .from("signatures")
        .select("created_at")
        .order("created_at", { ascending: true });
      const counts: Record<string, number> = {};
      data?.forEach((r) => {
        const day = r.created_at?.slice(0, 10);
        if (day) counts[day] = (counts[day] || 0) + 1;
      });
      dailyCounts = Object.entries(counts).map(([date, count]) => ({
        date,
        count,
      }));
    }

    return NextResponse.json({
      total: totalRes.count || 0,
      districts: districtCounts || [],
      daily: dailyCounts || [],
    });
  }

  if (action === "list") {
    const PAGE_SIZE = 50;
    const offset = (page - 1) * PAGE_SIZE;

    let query = supabaseAdmin
      .from("signatures")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,apartment.ilike.%${search}%,comment.ilike.%${search}%`
      );
    }

    const { data, count, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      signatures: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / PAGE_SIZE),
    });
  }

  if (action === "export") {
    const { data, error } = await supabaseAdmin
      .from("signatures")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ signatures: data || [] });
  }

  if (action === "delete" && id) {
    const { error } = await supabaseAdmin
      .from("signatures")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
