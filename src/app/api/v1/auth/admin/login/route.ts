import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/password";
import { COOKIE_NAME, createSession, SESSION_MAX_AGE_SEC } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`login:${ip}`, 20, 10 * 60 * 1000); // 20 attempts / 10 min
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 },
      );
    }

    const ok = await verifyAdminCredentials(password);
    // const ok = await verifyAdminCredentials(username, password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await createSession(username);
    const res = NextResponse.json({ success: true });

    res.cookies.set(`${COOKIE_NAME}`, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SEC,
    });

    return res;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
