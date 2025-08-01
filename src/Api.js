const API_BASE = "http://localhost:4000";

export async function addpost({ user_name, description, url, tags }) {
  const res = await fetch(`${API_BASE}/api/user/${user_name}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, url, tags }),
  });

  const post = await res.json();

  if (!res.ok) {
    throw new Error(post.error || "Upload failed");
  }

  return post;
}

export async function usersignup({ username, password }) {
  const res = await fetch(`${API_BASE}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const post = await res.json();

  if (!res.ok) {
    throw new Error(post.error || "Signup failed");
  }

  return post;
}

export async function userlogin({ username, password }) {
  const res = await fetch(`${API_BASE}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const post = await res.json();

  if (!res.ok) {
    throw new Error(post.error || "Login failed");
  }

  return post;
}

export async function fetchUser({ username }) {
  const res = await fetch(`${API_BASE}/api/user/fetchuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  const data = await res.json();
  console.log(data)

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch user");
  }

  return data;
}

export async function dopost({username,description,url}){
  const res = await fetch(`${API_BASE}/api/${username}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description,url }),
  });

  const data = await res.json();
  console.log(data)

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch user");
  }

  return data;

}


export const fetchAllPosts = async () => {
  const res = await fetch("http://localhost:4000/api/user/getallposts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
};
