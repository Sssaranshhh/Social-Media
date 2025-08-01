import userServices from "./user.service.js";

class UserController {
  async signup(req, res) {
    const { username, password } = req.body;

    try {
      const user = await userServices.signup({ username, password });
      res.status(201).json(user); 
      console.log("user created")
    } catch (e) {
      res.status(500).json({ error: e.message }); 
      console.log("error")
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await userServices.login({ username, password }); 
      res.status(200).json({ message: "Login success", user });
    } catch (e) {
      res.status(401).json({
        error: `Invalid credentials for ${username} — ${e.message}`,
      });
    }
  }

  async delete(req, res) {
    const { username } = req.params;

    try {
      const deleted = await userServices.delete({ username });
      res
        .status(200)
        .json({ message: `User ${username} deleted successfully`, deleted });
    } catch (e) {
      res.status(500).json({ error: `User not deleted — ${e.message}` });
    }
  }
 
   async getuser(req, res) {
    const { username } = req.body;
    console.log(username)


    try {
      const user = await userServices.getuser({ username });
      res.status(200).json(user);
          console.log("user fetched")

    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
}
export default new UserController();
