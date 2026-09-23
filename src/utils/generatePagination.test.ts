import { describe, expect, it } from "vitest";
import { generatePagination } from "./generatePagination";

describe("generatePagination", () => {
  it("lists every page when total pages <= 7", () => {
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePagination(7, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("collapses the middle when near the start", () => {
    expect(generatePagination(2, 10)).toEqual([1, 2, 3, "...", 9, 10]);
  });

  it("collapses the middle when near the end", () => {
    expect(generatePagination(9, 10)).toEqual([1, 2, "...", 8, 9, 10]);
  });

  it("keeps neighbours around the current page in the middle", () => {
    expect(generatePagination(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("returns an empty list for zero pages", () => {
    expect(generatePagination(1, 0)).toEqual([]);
  });
});
