import fs from "fs/promises";
import path from "path";
import mime from "mime-types"
export async function GET(req, { params }) {
  const { imageSlug } = params;

  if (!imageSlug) return new Response("Filename not provided", { status: 400 });

  const filePath = path.join(process.cwd(), "uploads", imageSlug);

  try {
    await fs.access(filePath); // ensures file exists
    const fileBuffer = await fs.readFile(filePath);

    const contentType = mime.lookup(imageSlug) || "application/octet-stream";

    return new Response(fileBuffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error("File not found:", filePath, err);
    return new Response("Not Found", { status: 404 });
  }
}
