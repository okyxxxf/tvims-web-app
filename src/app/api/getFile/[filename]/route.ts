import fs from 'fs';
import path from 'path';

type GetParams = {
  params: {
    filename: string;
  };
};

export async function GET(req: Request, { params }: GetParams) {
  const filename = params.filename;

  const filePath = path.join(process.cwd(), 'public', 'files', filename as string);

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    const fileData = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
      fileStream.on('end', () => resolve(Buffer.concat(chunks)));
      fileStream.on('error', reject);
    });

    return new Response(fileData, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment;filename=${filename}`,
      }
    })
    
  } else {
     throw new Error("File not found");
  }
}