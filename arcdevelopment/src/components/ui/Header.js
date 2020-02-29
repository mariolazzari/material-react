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
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
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
        {routes.map((route, i) => (
          <Tab
            key={i}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            onMouseOver={route.onMouseOver}
          ></Tab>
        ))}
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
        style={{ zIndex: 1302 }}
        keepMounted
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
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          {routes.map(route => (
            <ListItem
              key={route.link}
              divider
              button
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
              classes={{ selected: classes.drawerItemSelected }}
              selected={value === route.activeIndex}
            >
              <ListItemText
                //disableTypography
                className={classes.drawerItem}
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            divider
            button
            component={Link}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected
            }}
            selected={value === 5}
          >
            <ListItemText
              //disableTypography
              className={classes.drawerItem}
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
        <AppBar position="fixed" className={classes.appbar}>
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
