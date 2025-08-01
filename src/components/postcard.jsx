import { useState, useContext } from "react";
import { Postlist } from "./store";

export default function PostCard({ post }) {
  const { likePost } = useContext(Postlist);
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  // better logging for debugging
  // console.log("Post received in PostCard:", post);

  const handleLike = async () => {
    if (liked) return; // prevent double-like
    try {
      await likePost(post._id); // assume this returns a promise
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    } catch (err) {
      console.error("Failed to like post:", err);
      // Optionally show UI feedback
    }
  };

  return (
    <div className="w-full sm:w-[350px] rounded-xl overflow-hidden shadow-lg bg-gray-800 flex flex-col">
      <div className="px-4 py-2 flex items-center justify-between border-b">
        <span className="font-semibold text-gray-300">{post.author?.username}</span>
      </div>

      <div className="flex flex-wrap max-h-96 gap-1 items-start overflow-y-auto min-h-0 scrollbar-hidden">
        {Array.isArray(post.image) &&
          post.image.map((img, idx) => (
            <img
              key={img.id ?? idx}
              src={img.url}
              alt="Post"
              className="max-w-full max-h-40 rounded"
              style={{ display: "block" }}
            />
          ))}
      </div>

      <div className="px-4 py-2 text-sm text-gray-100 border-t bg-gray-800">
        <p>{post.description}</p>
        <p>{post.tags?.join(", ")}</p>
      </div>

      <div className="flex items-center justify-around px-4 py-2 border-t">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`font-semibold ${
            liked ? "text-green-400" : "text-red-500"
          } hover:opacity-80`}
        >
          {liked ? "Liked" : "Like"} {likeCount}
        </button>

        <button className="text-blue-500 hover:text-blue-600 font-semibold">
          Comments {post.comments?.length ?? 0}
        </button>

        {Array.isArray(post.image) && post.image.length > 0 && (
          <button
            className="text-gray-400 hover:text-gray-200 text-sm font-medium"
            onClick={() => setShowDescription((s) => !s)}
          >
            {showDescription ? "Hide" : "View"} Caption
          </button>
        )}
      </div>

      {showDescription && (
        <div className="px-4 py-2 text-sm text-gray-100 border-t bg-gray-800">
          <p>{post.description}</p>
          <p>{post.tags?.join(", ")}</p>
        </div>
      )}

      <div className="px-4 py-2 border-t text-xs text-gray-400">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Date of the post"}
      </div>
    </div>
  );
}
