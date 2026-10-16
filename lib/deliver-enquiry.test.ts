import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverEnquiry, resolveChannel, type DeliveryConfig } from "@/lib/deliver-enquiry";
import type { Enquiry } from "@/lib/enquiry-schema";

const enquiry: Enquiry = {
  name: "Amina Rahman",
  email: "amina@example.com",
  company: "Northline",
  role: "",
  service: "AI & Intelligent Automation",
  challenge: "We need an assistant that cites internal procedures and refuses when the source is missing from the corpus entirely.",
  investment: undefined,
  timeframe: "To be discussed",
  consent: true,
};

const empty: DeliveryConfig = { resendKey: "", to: "", from: "", webhookUrl: "", webhookSecret: "" };

afterEach(() => vi.restoreAllMocks());

describe("resolveChannel", () => {
  it("prefers a complete Resend configuration", () => {
    expect(resolveChannel({ ...empty, resendKey: "key", to: "ops@example.com", from: "site@example.com", webhookUrl: "https://example.com/hook" })).toBe("resend");
  });

  it("uses a webhook when Resend is incomplete", () => {
    expect(resolveChannel({ ...empty, webhookUrl: "https://example.com/hook" })).toBe("webhook");
    expect(resolveChannel(empty)).toBe("none");
  });
});

describe("deliverEnquiry", () => {
  it("does not report success when nothing is configured", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const result = await deliverEnquiry(enquiry, empty, fetchImpl);
    expect(result).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts to the webhook and reports failure without leaking the body", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("no", { status: 500 }));
    const result = await deliverEnquiry(enquiry, { ...empty, webhookUrl: "https://example.com/hook", webhookSecret: "secret" }, fetchImpl);
    expect(result).toEqual({ ok: false, reason: "delivery_failed" });
    const init = fetchImpl.mock.calls[0]?.[1];
    expect(init?.headers).toMatchObject({ Authorization: "Bearer secret" });
  });
});
