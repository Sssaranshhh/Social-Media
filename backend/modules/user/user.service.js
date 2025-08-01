import User from "./user.model.js";

class UserService {
  async signup({ username, password }) {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username already taken");
      }

      const user = await User.create({
        username,
        password, 
      });

      return {
        message: "Signup successful",
        user: {
          id: user._id,
          username: user.username,
        },
      };
    } catch (e) {
      throw new Error(`Signup failed: ${e.message}`);
    }
  }

  async login({ username, password }) {
    try {
      const user = await User.find({ username });
      if (!user) throw new Error("User not found");

      if (user.password !== password) {
        throw new Error("Incorrect password");
      }

      return {
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
        },
      };
    } catch (e) {
      throw new Error(`Login failed: ${e.message}`);
    }
  }

  async delete({ username }) {
    try {
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) throw new Error("User not found");

      return {
        message: `User ${username} deleted`,
        deletedUser: {
          id: deletedUser._id,
          username: deletedUser.username,
        },
      };
    } catch (e) {
      throw new Error(`Delete failed: ${e.message}`);
    }
  }
async getuser({ username }) {

  console.log(username)
  try {
    const user = await User.findOne({ username }).select("-password"); // Exclude password
    if (!user) throw new Error("User not found");

    return user;
  } catch (e) {
    throw new Error(`Get user failed: ${e.message}`);
  }
}

}

export default new UserService();
