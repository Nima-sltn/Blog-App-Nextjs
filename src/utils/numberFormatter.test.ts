import { describe, expect, it } from "vitest";
import { toPersianDigits } from "./numberFormatter";

describe("toPersianDigits", () => {
  it("converts numeric digits to Persian digits", () => {
    expect(toPersianDigits(1234567890)).toBe("۱۲۳۴۵۶۷۸۹۰");
  });

  it("converts digits inside strings", () => {
    expect(toPersianDigits("42 comments")).toBe("۴۲ comments");
  });

  it("leaves already-Persian strings untouched", () => {
    expect(toPersianDigits("۷")).toBe("۷");
  });

  it("handles zero", () => {
    expect(toPersianDigits(0)).toBe("۰");
  });
});
