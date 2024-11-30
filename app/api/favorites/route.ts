import { NextRequest, NextResponse } from 'next/server';
import { UserProfile } from '../../models/UserProfile';
import path from 'path';
import fs from 'fs/promises';

const DATA_FILE = path.join(process.cwd(), 'data', 'profiles.json');

async function readProfiles(): Promise<UserProfile[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data) as UserProfile[];
  } catch {
    return [];
  }
}

async function writeProfiles(profiles: UserProfile[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(profiles, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { userId, artistId }: { userId: string; artistId: string } = await request.json();
    const profiles = await readProfiles();

    const user = profiles.find((p) => p.id === userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    user.favorites = user.favorites || [];
    if (user.favorites.includes(artistId)) {
      user.favorites = user.favorites.filter((id) => id !== artistId); // Remove favorite
    } else {
      user.favorites.push(artistId); // Add favorite
    }

    await writeProfiles(profiles);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating favorites:', error);
    return NextResponse.json({ error: 'Failed to update favorites' }, { status: 500 });
  }
}
