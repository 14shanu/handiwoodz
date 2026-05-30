import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/constants/api";

const VALID_TAGS = Object.values(CACHE_TAGS);

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tag = body.tag as string;

    if (!tag || !VALID_TAGS.includes(tag as typeof VALID_TAGS[number])) {
      return NextResponse.json(
        { message: `Invalid tag. Valid tags: ${VALID_TAGS.join(", ")}` },
        { status: 400 }
      );
    }

    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      tag,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
