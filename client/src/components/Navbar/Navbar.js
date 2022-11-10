import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Grid,
  List,
  Container,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import RedditIcon from "@material-ui/icons/Reddit";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

import idiotOfTheEastLogo from "../../images/idiotOfTheEastLogo.png";
import idiotOfTheEastText from "../../images/idiotOfTheEastText.webp";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img
          className={classes.image}
          src={idiotOfTheEastLogo}
          alt='icon'
          height='120px'
        />
        <img
          component={Link}
          className={classes.textLogo}
          to='/'
          src={idiotOfTheEastText}
          alt='icon'
          height='200px'
        />
      </Link>
      <List className={classes.socials}>
        <Container>
          <Typography>Follow me on</Typography>
          <a href="https://www.instagram.com/idiotoftheeast/">
            <InstagramIcon fontSize='large' />
          </a>
          <a href="https://www.facebook.com/IdiotOfTheEast/">
            <FacebookIcon fontSize='large' />
          </a>
          <a href="https://www.reddit.com/user/IdiotoftheEast/">
            <RedditIcon fontSize='large' />
          </a>
        </Container>
        <Container>
          <Typography>Support me</Typography>
          <a href="https://www.patreon.com/IdiotoftheEast">
            <AttachMoneyIcon fontSize='large' />
          </a>
          <a href="https://ko-fi.com/idiotoftheeast">
            <LocalCafeIcon fontSize='large' />
          </a>
        </Container>
      </List>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              component={Link}
              to='/account'
              className={classes.userName}
              variant='h6'
            >
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Login / Sign up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
