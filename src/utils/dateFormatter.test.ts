import { describe, expect, it } from "vitest";
import { toLocalDateShort } from "./dateFormatter";

describe("toLocalDateShort", () => {
  it("formats an ISO date with the fa-IR locale", () => {
    const formatted = toLocalDateShort("2025-07-14T10:00:00.000Z");
    expect(formatted).toMatch(/[\/،؛\d]/);
    expect(formatted.length).toBeGreaterThan(0);
  });

  it("accepts epoch milliseconds", () => {
    expect(toLocalDateShort(0)).toBeTruthy();
  });

  it("accepts Date instances", () => {
    expect(toLocalDateShort(new Date())).toBeTruthy();
  });
});
