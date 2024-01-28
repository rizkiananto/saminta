import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
console.log('<<<<M<M<M<M<M<')
export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookies();
    
    const formData = await req.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    const {data, error} = await supabase
      .auth
      .signInWithPassword({ email, password });

    if (data) console.log('authed : ', data);

    if (error) console.log('errrr', error);

    return NextResponse.redirect(url.origin, {
        status: 301
    })
}