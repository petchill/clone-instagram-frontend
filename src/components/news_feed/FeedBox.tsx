// import { Heart, MessageCircle, Send } from "lucide-react";
import type { NewsFeed } from "../../types/newsfeed";

type FeedBoxProps = {
  post: NewsFeed;
};

export default function FeedBox({ post }: FeedBoxProps) {
  return (
    <article className="border-b border-gray-100">
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post.user.picture || "/"}
          alt={"profile image"}
          className="h-8 w-8 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="text-sm font-semibold text-gray-900">
          {post.user.name}
        </span>
      </div>

      <img
        src={post.media.file_storage_link}
        alt={`post-${post.media.id}`}
        className="h-auto w-full object-cover"
      />

      <div className="px-4 py-3">
        {/* <div className="mb-2 flex items-center gap-4">
          <button type="button" aria-label="Like">
            <Heart className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Comment">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Share">
            <Send className="h-6 w-6" />
          </button>
        </div> */}

        <p className="text-sm text-gray-900">
          <span className="mr-2 font-semibold mr-[8px]">{post.user.name}</span>
          {post.media.caption}
        </p>
      </div>
    </article>
  );
}
