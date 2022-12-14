import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9} className={classes.postContainer}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <AppBar
            className={classes.appBarSearch}
            position='static'
            color='inherit'
            display
          >
            <TextField
              className={classes.searchTextField}
              onKeyDown={handleKeyPress}
              name='search'
              variant='outlined'
              label='Search Posts'
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size='small'
            />
            {/* <ChipInput
              style={{ margin: "10px 0" }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label='Search Tags'
              variant='outlined'
            /> */}
            <Button onClick={searchPost} className={classes.searchButton}>
              <SearchIcon />
            </Button>
          </AppBar>
          {!searchQuery && !tags.length && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
