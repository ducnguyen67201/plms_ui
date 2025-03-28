import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	const protectedRoutes = ["/"];

	if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
		return NextResponse.redirect(new URL("/v1/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
