import { NextResponse, type NextRequest } from "next/server";
import { getObject, STORAGE_PREFIX } from "../../../../lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const objectPath = path.join("/");

  if (!objectPath.startsWith(`${STORAGE_PREFIX}/`)) {
    return NextResponse.json(
      { message: "Foto tidak ditemukan." },
      { status: 404 },
    );
  }

  try {
    const { data, contentType } = await getObject(objectPath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Foto tidak ditemukan." },
      { status: 404 },
    );
  }
}
