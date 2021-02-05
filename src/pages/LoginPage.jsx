import { React, useState } from "react";
import { useForm } from "react-hook-form";

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
    <form>
      <h3>Login</h3>
      <label htmlFor="author_name">User:</label>
      <input
        autoComplete="username"
        name="username"
        type="text"
        placeholder="Name"
        ref={register({ required: "required field" })}
      ></input>
      {errors.username && <p>{errors.username.message}</p>}

      <label htmlFor="password" placeholder="password">
        Password:
      </label>
      <input
        autoComplete="current-password"
        name="password"
        type="password"
        ref={register({ required: "required field" })}
      ></input>
      {errors.password && <p>{errors.password.message}</p>}

      {loginErr && <p>Username or password incorrect</p>}
      <button
        type="submit"
        onClick={((e) => e.preventDefault(), handleSubmit(onSubmit))}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
