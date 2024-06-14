import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import icon1 from "assets/images/trinity_agi_logo.svg";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/NotificationItem";
import SoftMenuItem from "components/SoftMenuItem";

import { signOut } from "aws-amplify/auth";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "components/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenFeedbacks,
} from "context";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import SoftBadge from "../SoftBadge";
import SoftAlert from "../SoftAlert";

import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText, MenuList } from "@mui/material";
import { ContentCut } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

function DashboardNavbar({ absolute, light, isMini, notifCount }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openFeedbacks } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // const handleConfiguratorOpen = () => setOpenFeedbacks(dispatch, !openFeedbacks);
  const handleSignOut = (event) => {
    signOut().then(() => {window.location.href = "/login"})

  };
  const handleUserMenu = (event) => setUserMenu(event.currentTarget);
  // Change the openFeedbacks state
  const handleOpenMenu = () => setOpenFeedbacks(dispatch, !openFeedbacks);
  // const handleOpenMenu = (event) => {
  //   setOpenMenu(event.currentTarget);
  //   restget("/api/feedbacks")
  //     .then((response) => {
  //       console.log(response);
  //       if(response.hasOwnProperty("error")) {
  //         window.location.href = "/auth";
  //       }
  //       else{
  //
  //         setFeedbacks(response["feedbacks"]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       window.location.href = "/auth";
  //     });
  // };
  const handleCloseMenu = () => {
    setOpenMenu(false);
    setUserMenu(false);
  };

  // Render the notifications menu
  const renderMenu = () => {

    let notifs = feedbacks.map((item, index) => (<NotificationItem
        key={index}
        image={<img src={icon1} alt="person" />}
        title={[item['feedback']['problem'], item['feedback']['description']]}
        color="light"
        date={item['timeStamp']}
        onClick={handleCloseMenu}
      />));

    console.log("openMenu", Boolean(openMenu));
    console.log("notifs", notifs);

    return (
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 2 }}
      >
        {notifs}
      </Menu>
    )
  };

  const renderUserMenu = () => {


    console.log("userMenu", Boolean(userMenu));

    return (
      <Menu
        anchorEl={userMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(userMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 2 }}
      >
        <SoftMenuItem
          image={<img src={icon1} alt="person" />}
          title={["Profile"]}
          color="light"
          onClick={handleCloseMenu}
        />
        <SoftMenuItem
          image={<img src={icon1} alt="person" />}
          title={["Sign Out"]}
          color="light"
          onClick={handleSignOut}
        />

      </Menu>
    )
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox color={light ? "white" : "inherit"}>
              <IconButton sx={navbarIconButton} size="medium" onClick={handleOpenMenu}>
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  notifications
                </Icon>
                {notifCount > 0 && (<SoftBadge circular variant="gradient" indicator  badgeContent={notifCount} color={"success"} size="xs" container></SoftBadge>)}

              </IconButton>
                <IconButton sx={navbarIconButton} size="small" onClick={handleUserMenu}>
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                </IconButton>
              {renderUserMenu()}
              {/* <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton> */}
              {/* <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton> */}


            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  notifCount: 0,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  notifCount: PropTypes.number
};

export default DashboardNavbar;
