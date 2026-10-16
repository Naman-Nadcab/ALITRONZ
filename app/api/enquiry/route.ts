import { NextResponse } from "next/server";
import { deliverEnquiry, readDeliveryConfig } from "@/lib/deliver-enquiry";
import { parseEnquiry } from "@/lib/enquiry-schema";
import { isSameOrigin } from "@/lib/origin";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 50_000;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  if (!rateLimit(clientKey(request.headers))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  if (body && typeof body === "object" && "company_website" in body) {
    const honeypot = String((body as { company_website?: unknown }).company_website ?? "").trim();
    if (honeypot) return NextResponse.json({ ok: true });
  }

  const parsed = parseEnquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: "validation", fields: parsed.fields }, { status: 400 });
  }

  const result = await deliverEnquiry(parsed.data, readDeliveryConfig());
  if (result.ok) return NextResponse.json({ ok: true });
  if (result.reason === "not_configured") {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}
