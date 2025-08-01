import Postschema from "./post.model.js";
import User from "../user/user.model.js";

class postService {
  async createpost({ description, url, username }) {
    console.log("hi 1");
    // console.log(username)
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");
        // console.log(user)
      const post = await Postschema.create({
        description,
        url,
        author: user._id,
        username: user.username,
      });
      console.log("hi 2");

      await User.findByIdAndUpdate(user._id, {
        $push: { user_posts: post._id },
      });
      return post;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async GetUserPost(username) {
    try {
      const user = await User.finOne({ username });
      if (!user) throw new Error("User not found");

      const posts = await Postschema.find({ author: user._id });
      return posts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getfeeds(username) {
    try {
      const user = await User.findOne({ username }).populate("following");
      if (!user) throw new Error("User not found");

      const followingIds = user.following.map((u) => u._id);

      const posts = await Postschema.find({
        author: { $in: followingIds },
      }).sort({ createdAt: -1 });

      return posts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getelseposts(username) {
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const otherPosts = await Postschema.find({
        author: { $ne: user._id },
      });

      return otherPosts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getallposts() {
    try {
      const posts = await Postschema.find().populate("author", "username");
      // console.log(posts)
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async likePost(postId) {
    try {
      const post = await Postschema.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!post) throw new Error("Post not found");
      return post;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
export default new postService();
