import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl, hasConfiguredSiteUrl, hasValidSiteUrlOverride } from "@/lib/site-url";

const original = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = original;
});

describe("site origin", () => {
  it("uses https://alitronz.com when the environment variable is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl().origin).toBe("https://alitronz.com");
    expect(hasConfiguredSiteUrl()).toBe(true);
    expect(hasValidSiteUrlOverride()).toBe(false);
  });

  it("accepts an explicit override", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example";
    expect(getSiteUrl().origin).toBe("https://preview.example");
    expect(hasValidSiteUrlOverride()).toBe(true);
  });

  it("ignores an invalid override", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "not a url";
    expect(getSiteUrl().origin).toBe("https://alitronz.com");
    expect(hasValidSiteUrlOverride()).toBe(false);
  });
});