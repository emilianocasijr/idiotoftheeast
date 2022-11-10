import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAccount } from "../../actions/auth";
import useStyles from "./styles";

const Account = () => {
  const classes = useStyles();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    setEdit(true);
  };

  const cancelEdit = (e) => {
    setEdit(false);
  };

  const setUserData = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAccount({ ...user }));
    setEdit(false);
  };

  return (
    <>
      {!edit ? (
        <div className={classes.account}>
          <Typography variant='h6' className={classes.text}>
            Username: {user?.name}{" "}
          </Typography>
          <Typography variant='h6' className={classes.text}>
            Email: {user?.email}{" "}
          </Typography>
          <Typography variant='h6' className={classes.text}>
            Profile Picture:{" "}
            <Avatar
              className={classes.purple}
              alt={user?.name}
              src={user?.imageUrl}
            >
              {user?.name.charAt(0)}
            </Avatar>
          </Typography>
          <Button onClick={handleEdit} variant='contained' color='primary'>
            Edit Account
          </Button>
        </div>
      ) : (
        <div className={classes.account}>
          <form
            autoComplete='off'
            noValidate
            onSubmit={handleSubmit}
            className={`${classes.form}`}
          >
            <TextField
              name='Name'
              variant='outlined'
              label='Name'
              fullWidth
              value={user?.name}
              className={`${classes.textField}`}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <Typography variant='h6' className={classes.text}>
              Email: {user?.email}{" "}
            </Typography>
            <Typography variant='h6' className={classes.text}>
              Profile Picture:{" "}
              <Avatar
                className={classes.purple}
                alt={user?.name}
                src={user?.imageUrl}
              >
                {user?.name.charAt(0)}
              </Avatar>
            </Typography>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Save Changes
            </Button>
            <Button onClick={cancelEdit} variant='contained' color='primary'>
              Cancel Edit
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Account;
