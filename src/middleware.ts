import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    let url = new URL(req.url);
    const supabase = createMiddlewareClient({ req, res });
    const {
        data: {session},
    } = await supabase.auth.getSession();

    if (!session) {
      url.pathname = '/'
      const urr = req.nextUrl.clone();
      urr.pathname = '';
      urr.search = '';
      if (req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(urr);
      } else return
    }
    return res;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}