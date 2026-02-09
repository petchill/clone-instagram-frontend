"use client";
import { useEffect, useState } from "react";
import PrivateLayout from "../layout/private";
import FeedBox from "../components/news_feed/FeedBox";
import { useNewsFeed } from "../hooks/newsFeed";
import type { NewsFeed } from "../types/newsfeed";

export default function NewsFeedPage() {
  const [newsFeed, setNewsFeed] = useState<NewsFeed[]>([]);
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
          {newsFeed.map((news) => (
            <FeedBox key={`feed-${news.media.id}`} post={news} />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
}
