import { describe, expect, it } from "vitest";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getApiErrorMessage } from "./apiError";

function axiosErrorWithResponse(message?: string): AxiosError {
  const request = {} as InternalAxiosRequestConfig;
  return new AxiosError(
    "Request failed",
    AxiosError.ERR_BAD_REQUEST,
    request,
    {},
    {
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: request,
      data: message !== undefined ? { message } : {},
    },
  );
}

describe("getApiErrorMessage", () => {
  it("extracts the backend message from an axios response envelope", () => {
    expect(getApiErrorMessage(axiosErrorWithResponse("کاربر یافت نشد"))).toBe(
      "کاربر یافت نشد",
    );
  });

  it("falls back to the axios message when the envelope has no message", () => {
    expect(getApiErrorMessage(axiosErrorWithResponse())).toBe(
      "Request failed",
    );
  });

  it("uses the message of a plain Error (e.g. from fetch)", () => {
    expect(getApiErrorMessage(new Error("شبکه در دسترس نیست"))).toBe(
      "شبکه در دسترس نیست",
    );
  });

  it("returns the generic fallback for non-error values", () => {
    expect(getApiErrorMessage(null)).toBe(
      "خطایی رخ داد، لطفا دوباره تلاش کنید",
    );
    expect(getApiErrorMessage(undefined)).toBe(
      "خطایی رخ داد، لطفا دوباره تلاش کنید",
    );
    expect(getApiErrorMessage("boom")).toBe(
      "خطایی رخ داد، لطفا دوباره تلاش کنید",
    );
  });

  it("honours a custom fallback", () => {
    expect(getApiErrorMessage(null, "خطای سرور")).toBe("خطای سرور");
  });
});
