import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-.]/g, '');
    const filename = `${timestamp}-${originalName}`;

    // Determine the upload type based on file MIME type
    const mimeType = file.type;
    let uploadSubDir = 'uploads';

    if (mimeType.startsWith('image/')) {
      uploadSubDir = 'uploads/images';
    } else if (mimeType.startsWith('audio/')) {
      uploadSubDir = 'uploads/music';
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', uploadSubDir);
    await mkdir(uploadDir, { recursive: true });

    // Save the file
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the URL of the uploaded file
    return NextResponse.json({ fileUrl: `/${uploadSubDir}/${filename}` });
  } catch (error) {
    // Type assertion for error
    const typedError = error instanceof Error ? error : new Error(String(error));

    console.error('File upload error:', typedError.message);

    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: typedError.message,
      },
      { status: 500 }
    );
  }
}
