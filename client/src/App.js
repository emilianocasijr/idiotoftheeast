import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import Account from "./components/Account/Account";
import CreateForm from "./components/Create/CreateForm";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(0);

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/create' exact component={CreateForm} />
          <Route path='/posts/edit/:id' exact component={CreateForm} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetails} />
          <Route
            path={["/creators/:name", "/tags/:name"]}
            component={CreatorOrTag}
          />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
          />
          <Route
            path='/account'
            exact
            component={() => (!user ? <Redirect to='/posts' /> : <Account />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
