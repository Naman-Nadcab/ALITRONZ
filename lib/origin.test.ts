import { describe, expect, it } from "vitest";
import { isSameOrigin } from "@/lib/origin";

describe("isSameOrigin", () => {
  it("matches origin to host", () => {
    const request = new Request("http://localhost:3000/api/enquiry", {
      headers: { origin: "http://localhost:3000", host: "localhost:3000" },
    });
    expect(isSameOrigin(request)).toBe(true);
  });

  it("rejects a missing or foreign origin", () => {
    const missing = new Request("http://localhost:3000/api/enquiry", { headers: { host: "localhost:3000" } });
    const foreign = new Request("http://localhost:3000/api/enquiry", {
      headers: { origin: "https://evil.example", host: "localhost:3000" },
    });
    expect(isSameOrigin(missing)).toBe(false);
    expect(isSameOrigin(foreign)).toBe(false);
  });
});
