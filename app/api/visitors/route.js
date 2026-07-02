import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Avoid static caching so each request actually increments.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await redis.incr("visitor_count");
    return Response.json({ count });
  } catch (error) {
    return Response.json({ count: null, error: "unavailable" }, { status: 500 });
  }
}
