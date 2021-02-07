import { React, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginForm = ({ setUserAuth }) => {
  const { register, handleSubmit, errors } = useForm();
  const [loginErr, setLoginErr] = useState(false);

  const onSubmit = async (data) => {
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(
        "https://dovimaj-blog-api.herokuapp.com/api/login",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const myJson = await req.json();
      if (req.status !== 200) {
        setLoginErr(true);
        return;
      }
      localStorage.setItem("token", myJson.token);
      localStorage.setItem("userAuth", true);
      setUserAuth(true);
    } catch (err) {
      setLoginErr(true);
    }
  };

  return (
    <Form className="layout">
      <h3>Login</h3>
      <Form.Group>
        <Form.Label htmlFor="author_name">User:</Form.Label>
        <Form.Control
          autoComplete="username"
          name="username"
          type="text"
          placeholder="Name"
          ref={register({ required: "required field" })}
        ></Form.Control>
        {errors.username && <Form.Text>{errors.username.message}</Form.Text>}
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password" placeholder="password">
          Password:
        </Form.Label>
        <Form.Control
          autoComplete="current-password"
          name="password"
          type="password"
          ref={register({ required: "required field" })}
        ></Form.Control>

        {errors.password && <Form.Text>{errors.password.message} </Form.Text>}
      </Form.Group>

      {loginErr && <Form.Text>Username or password incorrect</Form.Text>}
      <Button
        type="submit"
        onClick={((e) => e.preventDefault(), handleSubmit(onSubmit))}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
