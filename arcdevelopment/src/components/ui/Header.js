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
import Drawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    background: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  }
}));

// elevation
const ElevationScroll = props => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

// Header component
const Header = () => {
  // component styles
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // selected tab
  const [value, setValue] = useState(0);
  // menu anchor
  const [anchor, setAnchor] = useState(null);
  // menu visibility
  const [openMenu, setOpenMenu] = useState(false);
  // selected item index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // menu drawer visibility
  const [openDrawer, setOpenDrawer] = useState(false);

  // on tab change event hanlder
  const handleChange = (e, val) => setValue(val);
  // menu click event handler
  const handleClick = e => {
    setAnchor(e.currentTarget);
    setOpenMenu(true);
  };
  const handleClose = () => {
    setAnchor(null);
    setOpenMenu(false);
  };

  // menu options
  const menuOptions = [
    { link: "/services", name: "Services", activeIndex: 1, selectedIndex: 0 },
    {
      link: "/customsoftware",
      name: "Custom software",
      activeIndex: 1,
      selectedIndex: 1
    },
    {
      link: "/mobileapps",
      name: "Mobile apps",
      activeIndex: 1,
      selectedIndex: 2
    },
    { link: "/websites", name: "Web sites", activeIndex: 1, selectedIndex: 3 }
  ];

  // routes
  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      onMouseOver: e => handleClick(e)
    },
    { name: "Revolution", link: "/revolution", activeIndex: 2 },
    { name: "About us", link: "/about", activeIndex: 3 },
    { name: "Contact us", link: "/contact", activeIndex: 4 }
  ];

  // on menu item click event handler
  const handleMenuItemClick = (e, i) => {
    handleClose();
    setSelectedIndex(i);
  };

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

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
        open={openMenu}
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

  // menu drawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const drawer = (
    <Fragment>
      <Drawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItem
            divider
            button
            component={Link}
            to="/"
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            selected={value === 0}
          >
            <ListItemText
              disableTypography
              className={
                value === 0
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/services"
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            selected={value === 1}
          >
            <ListItemText
              disableTypography
              className={
                value === 1
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/revolution"
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            selected={value === 2}
          >
            <ListItemText
              disableTypography
              className={
                value === 2
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              The revolution
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/about"
            onClick={() => {
              setOpenDrawer(false);
              setValue(3);
            }}
            selected={value === 3}
          >
            <ListItemText
              disableTypography
              className={
                value === 3
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              About us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/contact"
            onClick={() => {
              setOpenDrawer(false);
              setValue(4);
            }}
            selected={value === 4}
          >
            <ListItemText
              disableTypography
              className={
                value === 4
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              Contact us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            selected={value === 5}
            className={classes.drawerItemEstimate}
          >
            <ListItemText
              disableTypography
              className={
                value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
            >
              Free estimate
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
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

            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
};

export default Header;
