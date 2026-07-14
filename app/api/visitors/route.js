import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Never statically cache — each request may assign a new number.
export const dynamic = "force-dynamic";

const COOKIE_NAME = "visitor_id";
const ONE_DAY = 60 * 60 * 24;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const existing = cookieStore.get(COOKIE_NAME)?.value;

    // Returning visitor: hand back their assigned number, don't increment.
    if (existing) {
      const parsed = Number(existing);
      if (Number.isFinite(parsed)) {
        return Response.json({ count: parsed });
      }
    }

    // New visitor: assign the next number and remember it in a cookie.
    const count = await redis.incr("visitor_count");
    cookieStore.set(COOKIE_NAME, String(count), {
      maxAge: ONE_DAY,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ count });
  } catch (error) {
    return Response.json({ count: null, error: "unavailable" }, { status: 500 });
  }
}
