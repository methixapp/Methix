export interface UserProfile {
  id: string;
  name: string;
  genre: string;
  discordUsername: string;
  discordServerId?: string;
  bio?: string;
  profileImage?: string;
  socialMediaLinks?: {
    [platform: string]: string;
  };
  uploadedMusic?: string[];
  favorites?: string[]; // List of favorite artist IDs
}
