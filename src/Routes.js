import { Switch, Route, Link, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home.jsx";
import { useEffect, useState } from "react";
import PostPage from "./pages/EditPost";
import NewPost from "./pages/NewPost";

function Routes() {
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userAuth");
    if (user) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, []);

  const logout = () => {
    setUserAuth(false);
    localStorage.clear();
  };

  return (
    <>
      <div className="Nav">
        <Link to="/">
          <h1>Blog CMS</h1>
        </Link>
        {userAuth && <button onClick={logout}>Logout</button>}
        <Link to="/newpost">New Post</Link>
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route exact path="/posts">
          {!userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <Home />}
        </Route>
        <Route exact path="/posts/:id">
          {!userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <PostPage />}
        </Route>
        <Route exact path="/newpost">
          {!userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <NewPost />}
        </Route>
        <Route path="/">
          <p>404</p>
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
