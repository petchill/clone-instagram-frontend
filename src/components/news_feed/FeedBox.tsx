// import { Heart, MessageCircle, Send } from "lucide-react";
import type { MediaMetaData } from "../../types/post";

type FeedBoxProps = {
  // username: string;
  // avatar: string;
  post: MediaMetaData;
};

export default function FeedBox({
  // username,
  // avatar,
  post,
}: FeedBoxProps) {
  return (
    <article className="border-b border-gray-100">
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={"/"}
          alt={"profile image"}
          className="h-8 w-8 rounded-full object-cover"
        />
        {/* <span className="text-sm font-semibold text-gray-900">{username}</span> */}
        <span className="text-sm font-semibold text-gray-900">
          {post.owner_user_id}
        </span>
      </div>

      <img
        src={post.file_storage_link}
        alt={`post-${post.id}`}
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
          <span className="font-bold mr-[8px]">{post.owner_user_id}</span>

          {/* <span className="mr-2 font-semibold">{username}</span> */}
          {post.caption}
        </p>
      </div>
    </article>
  );
}
