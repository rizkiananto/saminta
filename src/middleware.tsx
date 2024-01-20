import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest, NextResponse } from "next/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Database } from './database.types'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: {session},
        error
    } = await supabase.auth.getSession();
    console.log(session)
    if (!session) {
      console.log(':: no session')
      return NextResponse.rewrite(new URL('/', req.url));
    }
    console.log('res returned-->')
    return res;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}