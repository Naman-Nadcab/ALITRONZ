import { describe, expect, it, beforeEach } from "vitest";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => resetRateLimit());

  it("allows a burst and then blocks", async () => {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      await expect(rateLimit("10.0.0.1", 1_000)).resolves.toBe(true);
    }
    await expect(rateLimit("10.0.0.1", 1_000)).resolves.toBe(false);
  });

  it("opens the window again after it expires", async () => {
    await expect(rateLimit("10.0.0.2", 1_000, 1, 1_000)).resolves.toBe(true);
    await expect(rateLimit("10.0.0.2", 1_500, 1, 1_000)).resolves.toBe(false);
    await expect(rateLimit("10.0.0.2", 2_100, 1, 1_000)).resolves.toBe(true);
  });
});
