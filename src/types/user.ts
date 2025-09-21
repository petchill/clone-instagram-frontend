import type { MediaMetaData } from "./post";

export interface User {
  id: number;
  google_sub_id: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  created_at: Date; // or Date, depending on usage
}

export interface Profile {
  user: User;
  followers: User[];
  followings: User[];
  posts: MediaMetaData[];
}
