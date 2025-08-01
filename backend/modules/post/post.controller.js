import postService from "./post.service.js"

class postControler {
  async createpost(req, res) {
    const { description, url } = req.body;
    const { username } = req.params;
//  console.log(username)
    try {
      const post = await postService.createpost({
        description,
        url,
        username,
      });
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getuserposts(req, res) {
    const { username } = req.params;

    try {
      const Posts = await postService.GetUserPost(username);
      res.status(200).json(Posts);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getfeeds(req, res) {
    const { username } = req.params;
    try {
      const feeds = await postService.getfeeds(username);
      res.setStatus(200).json(feeds);
    } catch (e) {
      res.status(500).json(`alert ${e.message}`);
    }
  }

  async getelseposts(req, res) {
    const username = req.params;

    try {
      const elseposts = await postService.geteleposts(username);
      res.setstatus(200).json(elseposts);
    } catch (e) {
      res.setstatus(500).json(e.message);
    }
  }

  async getallposts(req, res) {
    try {
      const posts = await postService.getallposts();
      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async likePost(req, res) {
    const { postId } = req.params;

    try {
      const updatedPost = await postService.likePost(postId);
      res.status(200).json(updatedPost);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new postControler()