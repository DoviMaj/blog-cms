import { useState, React } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            ref={register({ required: "required field" })}
            name="title"
          ></Form.Control>
          {errors.title && <Form.Text>Required field</Form.Text>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="text">Text:</Form.Label>
          <Form.Control
            as="textarea"
            name="text"
            ref={register({ required: "required field" })}
          ></Form.Control>
          {errors.text && <Form.Text>Required field</Form.Text>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="author_name">Author:</Form.Label>
          <Form.Control
            name="author_name"
            ref={register({ required: "required field" })}
          ></Form.Control>
          {errors.author_name && <Form.Text>Required field</Form.Text>}
        </Form.Group>
        <Button
          type="submit"
          onClick={((e) => e.preventDefault(), handleSubmit(submitForm))}
        >
          Update
        </Button>
        {successMsg && <Form.Text>Submited successfully!</Form.Text>}
      </Form>
    </div>
  );
};

export default NewPost;
