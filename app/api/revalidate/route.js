// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  try {
    const { tags, secret } = await request.json();

    // Security Check
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return Response.json({ message: "No tags provided" }, { status: 400 });
    }

    // ✅ FIX: Proper async handling (replaces forEach)
    await Promise.all(tags.map(tag => revalidateTag(tag)));

    return Response.json({
      revalidated: true,
      purged: tags,
      at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return Response.json({ message: 'Invalid Request' }, { status: 500 });
  }
}
