import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
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
    <div className="postList layout">
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {posts &&
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default Home;
