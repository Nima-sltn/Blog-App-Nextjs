"use client";

import React from "react";

type ErrorPageProps = {
  readonly error: Error;
  readonly reset: () => void;
};

function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div>
          <h1 className="mb-8 text-xl font-bold text-secondary-700">
            {error.message}
          </h1>
          <button
            onClick={reset}
            className="flex items-center gap-x-2 text-secondary-500"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
