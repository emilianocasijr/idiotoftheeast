import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    flexDirection: "row",
    maxWidth: "400px",
    alignSelf: "flex-end",
    marginRight: "250px",
    [theme.breakpoints.down("xs")]: {
      // height: "50px",
      order: 3,
      maxWidth: "unset",
      marginRight: "0",
    },
  },
  searchTextField: {
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
      height: "20px",
    },
  },
  pagination: {
    borderRadius: 4,
    margin: "50px 0px",
    padding: "16px",
    order: "4",
    minWidth: "400px",
    maxWidth: "800px",
    margin: "100px 0",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      order: 1,
      margin: "50px 0",
      minWidth: "unset",
      maxWidth: "unset",
      alignSelf: "auto",
    },
  },
  postContainer: {
    order: 2,
    width: "100%",
    margin: "auto",
  },
  gridContainer: {
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
