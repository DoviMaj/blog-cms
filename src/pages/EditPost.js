import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditPost = () => {
  const [post, setPost] = useState();
  const [successMsg, setSuccessMsg] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const req = await fetch(
          `https://dovimaj-blog-api.herokuapp.com/api/posts/${id}`
        );
        if (req.status !== 200) {
          return;
        }
        const reqJson = await req.json();
        setPost(reqJson.post);
      } catch (err) {}
    };
    getPosts();
    setSuccessMsg(false);
  }, []);

  const submitForm = async (data) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(
        `https://dovimaj-blog-api.herokuapp.com/api/posts/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      setSuccessMsg(true);
    } catch (err) {}
  };

  const deletePost = async () => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      const req = await fetch(
        `https://dovimaj-blog-api.herokuapp.com/api/posts/${id}`,
        {
          method: "delete",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      history.push("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {post ? (
        <div>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              ref={register({ required: "required field" })}
              name="title"
              defaultValue={post.title}
            ></input>
            {errors.title && <p>Required field</p>}

            <label htmlFor="text">Text:</label>
            <input
              name="text"
              ref={register({ required: "required field" })}
              defaultValue={post.text}
            ></input>
            {errors.text && <p>Required field</p>}

            <label htmlFor="author_name">Author:</label>
            <input
              name="author_name"
              ref={register({ required: "required field" })}
              defaultValue={post.author_name}
            ></input>
            {errors.author_name && <p>Required field</p>}

            <button
              type="submit"
              onClick={((e) => e.preventDefault(), handleSubmit(submitForm))}
            >
              Update
            </button>
            {successMsg && <p>Updated successfully!</p>}
          </form>
          <button onClick={deletePost}>Delete post</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditPost;
