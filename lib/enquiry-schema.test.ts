import { describe, expect, it } from "vitest";
import { parseEnquiry, parseStep } from "@/lib/enquiry-schema";

const valid = {
  name: "Amina Rahman",
  email: "amina@example.com",
  company: "Northline",
  role: "Product director",
  service: "Digital Product Engineering",
  challenge: "We need a client portal and a mobile companion that share one account model and one API.",
  investment: "To be discussed",
  timeframe: "3–6 months",
  consent: true,
};

describe("parseEnquiry", () => {
  it("accepts a complete enquiry", () => {
    const result = parseEnquiry(valid);
    expect(result.ok).toBe(true);
  });

  it("allows an empty investment and role", () => {
    const result = parseEnquiry({ ...valid, investment: "", role: "" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.investment).toBeUndefined();
      expect(result.data.role).toBe("");
    }
  });

  it("rejects a short challenge, a bad email, and missing consent", () => {
    const result = parseEnquiry({ ...valid, email: "not-an-email", challenge: "Too short", consent: false });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fields.email).toBeTruthy();
      expect(result.fields.challenge).toBeTruthy();
      expect(result.fields.consent).toBeTruthy();
    }
  });
});

describe("parseStep", () => {
  it("checks only the fields on the current step", () => {
    expect(parseStep(1, { name: "Amina Rahman", email: "amina@example.com", company: "Northline", role: "" }).ok).toBe(true);
    expect(parseStep(2, { service: "", challenge: "" }).ok).toBe(false);
  });
});
