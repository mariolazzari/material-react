import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import logo from "../../assets/logo.svg";

// component styles
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo: {
    height: "7em"
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      background: "transparent"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    fontSize: "1rem",
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px"
  }
}));

// elevation
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

// Header component
function Header() {
  // selected tab
  const [value, setValue] = useState(0);
  // component stylrd
  const classes = useStyles();
  // on tab change event hanlder
  const handleChange = (e, val) => setValue(val);

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="Arc Development" className={classes.logo} />
            </Button>

            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab
                label="Home"
                className={classes.tab}
                component={Link}
                to="/"
              />
              <Tab
                label="Services"
                className={classes.tab}
                component={Link}
                to="/services"
              />
              <Tab
                label="The Revolution"
                className={classes.tab}
                component={Link}
                to="/revoluton"
              />
              <Tab
                label="About Us"
                className={classes.tab}
                component={Link}
                to="/about"
              />
              <Tab
                label="Contact Us"
                className={classes.tab}
                component={Link}
                to="/contact"
              />
            </Tabs>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
}

export default Header;
