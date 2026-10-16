import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/enquiry/route";
import { resetRateLimit } from "@/lib/rate-limit";

const valid = {
  name: "Amina Rahman",
  email: "amina@example.com",
  company: "Northline",
  role: "Director",
  service: "Financial & Trading Technology",
  challenge: "We operate the brokerage and need a workstation that labels demonstration execution separately from production.",
  investment: "",
  timeframe: "To be discussed",
  consent: true,
  company_website: "",
};

function request(body: unknown, origin = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/enquiry", {
    method: "POST",
    headers: {
      origin,
      host: "localhost:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  resetRateLimit();
  delete process.env.RESEND_API_KEY;
  delete process.env.ENQUIRY_TO_EMAIL;
  delete process.env.ENQUIRY_FROM_EMAIL;
  delete process.env.ENQUIRY_WEBHOOK_URL;
  delete process.env.ENQUIRY_WEBHOOK_SECRET;
});

describe("POST /api/enquiry", () => {
  it("does not claim success when delivery is not configured", async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ ok: false, error: "not_configured" });
  });

  it("rejects invalid enquiries", async () => {
    const response = await POST(request({ ...valid, email: "bad" }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.fields.email).toBeTruthy();
  });

  it("does not deliver honeypot submissions", async () => {
    process.env.ENQUIRY_WEBHOOK_URL = "https://example.com/hook";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    const response = await POST(request({ ...valid, company_website: "https://spam.example" }));
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    fetchMock.mockRestore();
  });
});
