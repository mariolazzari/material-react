import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "../../assets/logo.svg";

// component styles
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
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
  },
  menu: {
    color: "white",
    backgroundColor: theme.palette.common.blue,
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
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
  // component styles
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // selected tab
  const [value, setValue] = useState(0);
  // menu anchor
  const [anchor, setAnchor] = useState(null);
  // menu visibility
  const [open, setOpen] = useState(false);
  // selected item index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // on tab change event hanlder
  const handleChange = (e, val) => setValue(val);
  // menu click event handler
  const handleClick = e => {
    setAnchor(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  };

  // menu options
  const menuOptions = [
    { link: "/services", name: "Services" },
    { link: "/customsoftware", name: "Custom software" },
    { link: "/mobileapps", name: "Mobile apps" },
    { link: "/websites", name: "Web sites" }
  ];

  // on menu item click event handler
  const handleMenuItemClick = (e, i) => {
    handleClose();
    setSelectedIndex(i);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;

      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;

      case "/customsoftware":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;

      case "/mobileapps":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;

      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;

      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;

      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;

      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;

      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;

      default:
        break;
    }
  }, [value]);

  const tabs = (
    <Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab label="Home" className={classes.tab} component={Link} to="/" />
        <Tab
          label="Services"
          className={classes.tab}
          component={Link}
          to="/services"
          onMouseOver={e => handleClick(e)}
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

      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map(({ name, link }, i) => (
          <MenuItem
            key={i}
            onClick={e => {
              handleMenuItemClick(i);
              setValue(1);
              handleClose();
            }}
            component={Link}
            to={link}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndex && value === 1}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );

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

            {matches ? null : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
}

export default Header;
