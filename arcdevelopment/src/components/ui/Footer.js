import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import foorerAdd from "../../assets/Footer Adornment.svg";

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative"
  },
  footerAdd: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em"
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em"
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <img src={foorerAdd} alt="Footer logo" className={classes.footerAdd} />
    </footer>
  );
};

export default Footer;
