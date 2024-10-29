import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('image') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a unique filename
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  
  // Specify the directory where you want to save the uploaded images
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Ensure the upload directory exists
  await writeFile(path.join(uploadDir, filename), buffer);

  // Return the URL of the uploaded image
  return NextResponse.json({ imageUrl: `/uploads/${filename}` });
}

