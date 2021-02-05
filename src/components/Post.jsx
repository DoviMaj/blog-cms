import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

const Post = ({ post }) => {
  let match = useRouteMatch();

  return (
    <div>
      <Link to={`${match.url}/${post._id}`}>
        <h1>{post.title}</h1>
        <p>{post.text} </p>
      </Link>
    </div>
  );
};

export default Post;
