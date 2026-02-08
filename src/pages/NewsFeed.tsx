"use client";
import { useEffect, useState } from "react";
import PrivateLayout from "../layout/private";
import { mockProfile } from "../data/user";
// import { useUser } from "../hooks/user";
// import type { Profile } from "../types/user";
import FeedBox from "../components/news_feed/FeedBox";
import { useNewsFeed } from "../hooks/newsFeed";
import type { MediaMetaData } from "../types/post";

export default function NewsFeedPage() {
  // const [profile, setProfile] = useState<Profile>(mockProfile);
  const [newsFeed, setNewsFeed] = useState<MediaMetaData[]>(mockProfile.posts);
  const { getNewsFeed } = useNewsFeed();

  useEffect(() => {
    async function fetchNewsFeed() {
      try {
        const newsFeedData = await getNewsFeed();
        setNewsFeed(newsFeedData);
      } catch (error) {
        console.error("fetchNewsFeed error:", error);
        setNewsFeed([]);
      }
    }

    fetchNewsFeed();
  }, []);

  return (
    <PrivateLayout>
      <div className="mx-auto h-full overflow-hidden bg-white ">
        <div className="sticky top-0 z-10 bg-white px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">News Feed</h1>
        </div>

        <div>
          {newsFeed.map((post) => (
            <FeedBox
              key={post.id}
              // username={profile.user.given_name}
              // avatar={profile.user.picture}
              post={post}
            />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
}
