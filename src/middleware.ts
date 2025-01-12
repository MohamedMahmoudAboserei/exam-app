import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = ['/sign-in', '/register', '/forget-password'];
const privatePages = ['/'];

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl.pathname;

    if (token && authPages.includes(url)) {
        const redirectUrl = new URL("/", request.url);
        return NextResponse.rewrite(redirectUrl);
    }

    if (!token && authPages.includes(url)) {
        const redirectUrl = new URL("/sign-in", request.url);
        return NextResponse.rewrite(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/exams', '/quiz-history' ],
};