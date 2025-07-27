"use client";

import React from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
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

export default Error;
