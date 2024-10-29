import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserProfile } from '../../models/UserProfile';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

async function ensureDataDirectoryExists() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function getProfiles(): Promise<UserProfile[]> {
  await ensureDataDirectoryExists();
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If the file doesn't exist or can't be read, return an empty array
    return [];
  }
}

async function saveProfiles(profiles: UserProfile[]) {
  await ensureDataDirectoryExists();
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2));
}

export async function GET() {
  const profiles = await getProfiles();
  return NextResponse.json(profiles);
}

export async function POST(request: NextRequest) {
  const newProfile: UserProfile = await request.json();
  const profiles = await getProfiles();
  newProfile.id = Date.now().toString();
  profiles.push(newProfile);
  await saveProfiles(profiles);
  return NextResponse.json(newProfile, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const updatedProfile: UserProfile = await request.json();
  const profiles = await getProfiles();
  const index = profiles.findIndex(p => p.id === updatedProfile.id);
  if (index !== -1) {
    profiles[index] = updatedProfile;
  } else {
    updatedProfile.id = Date.now().toString();
    profiles.push(updatedProfile);
  }
  await saveProfiles(profiles);
  return NextResponse.json(updatedProfile);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  const profiles = await getProfiles();
  const filteredProfiles = profiles.filter(p => p.id !== id);
  await saveProfiles(filteredProfiles);
  return NextResponse.json({ message: 'Profile deleted' });
}
