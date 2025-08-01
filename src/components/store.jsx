import { createContext, useReducer, useEffect } from "react";
import {fetchAllPosts} from "../Api"

const Postlist = createContext({});

// Reducer function
const postreducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST": {
      const { newpost } = action.payload;
      return [newpost, ...state];
    }

    case "LIKE_POST": {
      const { postId } = action.payload;
      return state.map((post) => {
        if (post._id === postId || post.id === postId) {
          return {
            ...post,
            likes: (post.likes || 0) + 1,
          };
        }
        return post;
      });
    }

    default:
      return state;
  }
};

const Postcontext = ({ children, dopost, setdopost }) => {
  const initialstate = [
    {
      id: 2,
      user_id: 45,
      user_name: "Pranjal",
      tags: ["#hi", "#hlo", "#konnichiva", "#dou shi mashitaka"],
      likes: 4,
      comments: [
        {
          user_id: 78,
          text: "noice",
        },
      ],
      description: "hey this is the first post",
    },
    {
      id: 3,
      user_id: 5,
      user_name: "Pranjal",
      tags: ["#hi", "#hlo", "#konnichiva", "#dou shi mashitaka"],
      likes: 0,
      comments: [
        {
          user_id: 8,
          text: "hot",
        },
      ],
      description: "hey this is the second post",
    },
  ];

  const [state, dispatchupdate] = useReducer(postreducer, initialstate);

   useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchAllPosts();
        for (const post of posts) {
          dispatchupdate({ type: "ADD_POST", payload: { newpost: post } });
        }
      } catch (e) {
        console.error("Error fetching posts:", e.message);
      }
    };

    getPosts();
  }, []);




  // Add a post
  const addtopostlist = (newpost) => {
    dispatchupdate({
      type: "ADD_POST",
      payload: {
        newpost,
      },
    });
  };

  // Like a post (increase count only)
  const likePost = (postId) => {
    dispatchupdate({
      type: "LIKE_POST",
      payload: { postId },
    });
  };

  const deletepost = () => {
    // implement later
  };

  return (
    <Postlist.Provider
      value={{
        state,
        addtopostlist,
        deletepost,
        dopost,
        setdopost,
        likePost,
      }}
    >
      {children}
    </Postlist.Provider>
  );
};

export { Postlist };
export default Postcontext;