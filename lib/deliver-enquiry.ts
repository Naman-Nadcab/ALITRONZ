import type { Enquiry } from "@/lib/enquiry-schema";

export type DeliveryConfig = {
  resendKey: string;
  to: string;
  from: string;
  webhookUrl: string;
  webhookSecret: string;
};

export type DeliveryResult =
  | { ok: true; channel: "resend" | "webhook" }
  | { ok: false; reason: "not_configured" | "delivery_failed" };

export function readDeliveryConfig(): DeliveryConfig {
  return {
    resendKey: process.env.RESEND_API_KEY?.trim() ?? "",
    to: process.env.ENQUIRY_TO_EMAIL?.trim() ?? "",
    from: process.env.ENQUIRY_FROM_EMAIL?.trim() ?? "",
    webhookUrl: process.env.ENQUIRY_WEBHOOK_URL?.trim() ?? "",
    webhookSecret: process.env.ENQUIRY_WEBHOOK_SECRET?.trim() ?? "",
  };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function resolveChannel(config: DeliveryConfig): "resend" | "webhook" | "none" {
  if (config.resendKey && isEmail(config.to) && isEmail(config.from)) return "resend";
  if (config.webhookUrl && isHttpUrl(config.webhookUrl)) return "webhook";
  return "none";
}

function enquiryText(enquiry: Enquiry, submittedAt: string) {
  return [
    "New project enquiry from the Alitroz Technology website.",
    "",
    `Submitted: ${submittedAt}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company}`,
    `Role: ${enquiry.role || "Not provided"}`,
    `Service: ${enquiry.service}`,
    `Investment range: ${enquiry.investment || "Not provided"}`,
    `Timeframe: ${enquiry.timeframe}`,
    "",
    "Project description:",
    enquiry.challenge,
  ].join("\n");
}

export async function deliverEnquiry(
  enquiry: Enquiry,
  config: DeliveryConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  const channel = resolveChannel(config);
  if (channel === "none") return { ok: false, reason: "not_configured" };

  const submittedAt = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    if (channel === "resend") {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${config.resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          reply_to: enquiry.email,
          subject: `Project enquiry: ${enquiry.company}`.slice(0, 180),
          text: enquiryText(enquiry, submittedAt),
        }),
      });
      if (!response.ok) {
        console.error("Enquiry delivery failed", "resend", response.status);
        return { ok: false, reason: "delivery_failed" };
      }
      return { ok: true, channel: "resend" };
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (config.webhookSecret) headers.Authorization = `Bearer ${config.webhookSecret}`;
    const response = await fetchImpl(config.webhookUrl, {
      method: "POST",
      signal: controller.signal,
      headers,
      body: JSON.stringify({ ...enquiry, submittedAt, source: "alitroz-website" }),
    });
    if (!response.ok) {
      console.error("Enquiry delivery failed", "webhook", response.status);
      return { ok: false, reason: "delivery_failed" };
    }
    return { ok: true, channel: "webhook" };
  } catch (error) {
    console.error("Enquiry delivery failed", channel, error instanceof Error ? error.name : "error");
    return { ok: false, reason: "delivery_failed" };
  } finally {
    clearTimeout(timer);
  }
}
