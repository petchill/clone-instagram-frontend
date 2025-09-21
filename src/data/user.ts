import type { Profile, User } from "../types/user";
import { mockPost, mockPost2 } from "./post";

export const mockUser: User = {
  id: 1,
  google_sub_id: "116924095444948982258",
  name: "Songpon Ninwong",
  given_name: "Songpon",
  family_name: "Ninwong",
  picture:
    "https://lh3.googleusercontent.com/a/ACg8ocJcvzd5LojBo9aGk1--EXSEAUlKLIR1z8LINfJrz77bbwErsCNV=s96-c",
  email: "songpon111333@gmail.com",
  created_at: new Date("2024-06-16T14:20:30.123Z"),
};

export const mockUser2: User = {
  id: 2,
  google_sub_id: "123456789012345678901",
  name: "Jane Doe",
  given_name: "Jane",
  family_name: "Doe",
  picture: "https://randomuser.me/api/portraits/men/43.jpg",
  email: "petch.songpon@gmail.com",
  created_at: new Date("2024-06-16T14:20:30.123Z"),
};

export const mockProfile: Profile = {
  user: mockUser,
  followers: [mockUser2],
  followings: [mockUser2],
  posts: [
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
    mockPost,
    mockPost2,
  ],
};
