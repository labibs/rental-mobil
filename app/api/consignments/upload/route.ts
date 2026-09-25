import { NextResponse } from "next/server";
import { putObject, STORAGE_PREFIX } from "../../../lib/storage";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Format upload tidak valid." },
      { status: 400 },
    );
  }

  const file = formData.get("photo");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "File foto wajib diisi." },
      { status: 400 },
    );
  }

  const extension = EXTENSIONS[file.type];

  if (!extension) {
    return NextResponse.json(
      { message: "Format foto harus JPG, PNG, WEBP, atau GIF." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "Ukuran foto maksimal 5 MB." },
      { status: 400 },
    );
  }

  const objectPath = `${STORAGE_PREFIX}/uploads/${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}${extension}`;

  try {
    const result = await putObject(
      objectPath,
      Buffer.from(await file.arrayBuffer()),
      file.type,
    );
    return NextResponse.json({
      url: `/api/consignments/photo/${result.path}`,
    });
  } catch {
    return NextResponse.json(
      { message: "Upload foto gagal, coba lagi." },
      { status: 502 },
    );
  }
}
