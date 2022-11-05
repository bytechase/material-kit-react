import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/setup/e/")) {
    console.log("Incoming Request");
    console.log(request);
    console.log("----------");
    console.log(`https://connect.stripe.com${request.nextUrl.pathname}`);
    return NextResponse.redirect(new URL(`https://connect.stripe.com${request.nextUrl.pathname}`));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    727;
    return withMiddlewareAuth({ redirectTo: "/login" });
  }
}
