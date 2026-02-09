import type { MediaMetaData } from "./post";
import type { User } from "./user";

export interface NewsFeed {
  media: MediaMetaData;
  user: User;
}
