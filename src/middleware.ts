import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const callbackUrl = encodeURIComponent(req.nextUrl.href);
    const newUrl = new URL(
      `/api/auth/signin?callbackUrl=${callbackUrl}`,
      req.nextUrl.origin,
    );
    return Response.redirect(newUrl);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/admin/:path*"],
};
