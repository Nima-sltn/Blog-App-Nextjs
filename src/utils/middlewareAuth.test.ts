import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { middlewareAuth } from "./middlewareAuth";

function makeRequest(withCookies: boolean): NextRequest {
  return {
    cookies: {
      get: (name: string) => (withCookies ? { name, value: "token" } : undefined),
    },
  } as unknown as NextRequest;
}

describe("middlewareAuth", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://api.test";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null without calling the API when no auth cookies exist", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    return middlewareAuth(makeRequest(false)).then((user) => {
      expect(user).toBeNull();
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  it("returns the inner user when the profile request succeeds", () => {
    const user = { _id: "u1", name: "سارا" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ statusCode: 200, data: { user } }),
      }),
    );

    return middlewareAuth(makeRequest(true)).then((result) => {
      expect(result).toEqual(user);
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        "http://api.test/user/profile",
        expect.objectContaining({ credentials: "include" }),
      );
    });
  });

  it("returns null when the API responds with a non-ok status", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 }),
    );

    return middlewareAuth(makeRequest(true)).then((user) => {
      expect(user).toBeNull();
    });
  });

  it("returns null when the API is unreachable", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );

    return middlewareAuth(makeRequest(true)).then((user) => {
      expect(user).toBeNull();
    });
  });

  it("returns null when the payload has no user", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ statusCode: 200, data: {} }),
      }),
    );

    return middlewareAuth(makeRequest(true)).then((user) => {
      expect(user).toBeNull();
    });
  });
});
