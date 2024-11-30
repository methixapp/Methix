import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserProfile } from '../../models/UserProfile';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

// Ensure the data directory exists
async function ensureDataDirectoryExists() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// Fetch all profiles from the file
async function getProfiles(): Promise<UserProfile[]> {
  await ensureDataDirectoryExists();
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return []; // Return an empty array if the file doesn't exist or can't be read
  }
}

// Save profiles to the file
async function saveProfiles(profiles: UserProfile[]) {
  await ensureDataDirectoryExists();
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2));
}

// Handle GET: Fetch all profiles
export async function GET() {
  const profiles = await getProfiles();
  return NextResponse.json(profiles);
}

// Handle POST: Add a new profile
export async function POST(request: NextRequest) {
  try {
    const newProfile: UserProfile = await request.json();
    const profiles = await getProfiles();

    // Ensure all fields are initialized
    newProfile.id = Date.now().toString();
    newProfile.socialMediaLinks = newProfile.socialMediaLinks || {};
    newProfile.uploadedMusic = newProfile.uploadedMusic || [];

    profiles.push(newProfile);
    await saveProfiles(profiles);

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

// Handle PUT: Update an existing profile
export async function PUT(request: NextRequest) {
  try {
    const updatedProfile: UserProfile = await request.json();
    const profiles = await getProfiles();

    const index = profiles.findIndex((p) => p.id === updatedProfile.id);
    if (index !== -1) {
      // Merge updated fields with existing profile
      profiles[index] = { ...profiles[index], ...updatedProfile };
    } else {
      updatedProfile.id = Date.now().toString();
      profiles.push(updatedProfile);
    }

    await saveProfiles(profiles);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

// Handle DELETE: Delete a profile by ID
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const profiles = await getProfiles();
    const filteredProfiles = profiles.filter((p) => p.id !== id);

    await saveProfiles(filteredProfiles);
    return NextResponse.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}
