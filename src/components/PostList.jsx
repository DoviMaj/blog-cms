import React, { useEffect, useState } from "react";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const req = await fetch(
          "https://dovimaj-blog-api.herokuapp.com/api/posts"
        );
        if (req.status !== 200) {
        }
        const reqJson = await req.json();
        setPosts(reqJson.posts);
      } catch (err) {}
    };
    getPosts();
  }, []);

  return (
    <div>
      <p>Blog Posts</p>
      {posts &&
        posts.map((post) => {
          return <Post post={post} />;
        })}
    </div>
  );
};

export default PostList;
