  import fs from "fs/promises";
  import path from "path";

  export async function ImageSave(image){
    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, image.name);
    await fs.writeFile(filePath, buffer);
    return image.name
  }
  