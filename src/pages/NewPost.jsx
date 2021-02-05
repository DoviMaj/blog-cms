import { useState, React } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const NewPost = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  const submitForm = async (data) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(
        `https://dovimaj-blog-api.herokuapp.com/api/posts/`,
        {
          method: "post",
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
      history.push("/posts");
      setSuccessMsg(true);
    } catch (err) {}
  };
  return (
    <div>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          ref={register({ required: "required field" })}
          name="title"
        ></input>
        {errors.title && <p>Required field</p>}

        <label htmlFor="text">Text:</label>
        <input
          name="text"
          ref={register({ required: "required field" })}
        ></input>
        {errors.text && <p>Required field</p>}

        <label htmlFor="author_name">Author:</label>
        <input
          name="author_name"
          ref={register({ required: "required field" })}
        ></input>
        {errors.author_name && <p>Required field</p>}

        <button
          type="submit"
          onClick={((e) => e.preventDefault(), handleSubmit(submitForm))}
        >
          Update
        </button>
        {successMsg && <p>Submited successfully!</p>}
      </form>
    </div>
  );
};

export default NewPost;
