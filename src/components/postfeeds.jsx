import { useContext } from "react";
import PostCard from "./postcard";
import { Postlist } from "./store";

const PostFeeds = () => {
  const { state } = useContext(Postlist);

  const uniquePosts = Array.from(
    new Map(state.map((post) => [post._id, post])).values()
  );

  return (
    <div className="w-[500px] bg-gray-800 h-full overflow-y-auto min-h-0 scrollbar-hide shrink-0 border-2 border-green-600 rounded justify-center">
      <div className="flex flex-col items-center p-4 space-y-4">
        {uniquePosts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default PostFeeds;
