import { describe, expect, it } from "vitest";
import truncateText from "./trancateText";

describe("truncateText", () => {
  it("returns the string untouched when shorter than the limit", () => {
    expect(truncateText("کوتاه", 10)).toBe("کوتاه");
  });

  it("returns the string untouched when exactly at the limit", () => {
    expect(truncateText("12345", 5)).toBe("12345");
  });

  it("truncates and appends an ellipsis when longer than the limit", () => {
    expect(truncateText("123456", 3)).toBe("123...");
  });

  it("handles an empty string", () => {
    expect(truncateText("", 5)).toBe("");
  });
});
