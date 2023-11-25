import { NextResponse } from "next/server";

import { ApiKeyError } from "./requireProjectApiKey";

export const handleError = (error: unknown) => {
  if (error instanceof ApiKeyError) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 401,
      },
    );
  }

  if (error instanceof Error) {
    console.error(error.stack);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    {
      error: "An unexpected error occurred",
    },
    {
      status: 500,
    },
  );
};
