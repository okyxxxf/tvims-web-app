import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const p = new PrismaClient();

export async function POST(req: Request) {
  const {title, description, file} = await req.json();

  const doc = await p.document.create({
    data: {
      title: title,
      description: description,
      url: file.name,
      isPublished: true
    }
  });

  if (doc) {
    const directoryPath = path.join(process.cwd(), 'public', 'files');
    const filePath = path.join(directoryPath, file.name);

    const data = Buffer.from(file.data, 'base64');

    fs.writeFileSync(filePath, data);
  }

  return new Response("Success", {
    status: 200
  });
}