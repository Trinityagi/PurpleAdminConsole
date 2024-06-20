import { useState, useEffect } from "react";


// Cognito auth components
import { fetchAuthSession } from "aws-amplify/auth";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Custom styles for the FeedbackSideBar
import ConfiguratorRoot from "./ConfiguratorRoot";

import { restget } from "../../restcalls";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenFeedbacks,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor, setOpenProfile,
} from "context";
import NotificationItem from "../NotificationItem";
import icon1 from "../../assets/images/trinity_agi_logo.svg";
import Menu from "@mui/material/Menu";
import FeedbacksList from "../FeedbacksList";

function FeedbackSideBar() {

  const [controller, dispatch] = useSoftUIController();
  const { openFeedbacks, transparentSidenav, fixedNavbar, openProfile } = controller;
  const [disabled, setDisabled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [userEmail, setUserEmail] = useState("")
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handleCloseFeedbacks = () => {
    console.log("handleCloseFeedbacks: ");
    setOpenFeedbacks(dispatch, false);
    setOpenProfile(dispatch, false);
  };
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // console.log("renderMenu: openFeedbacks: ", openFeedbacks);
  // console.log("renderMenu: openProfile: ", openProfile);
  const renderMenu = () => {
    // console.log("renderMenu: openFeedbacks: ", openFeedbacks);
    // console.log("renderMenu: openProfile: ", openProfile);
    // console.log("feedbacks: ");

    let feedbackItems = feedbacks.map((item, index) => (
      {
        name: item["userId"],
        description: item["feedback"]["description"],
        problem: item["feedback"]["problem"],
        rating: item["feedback"]["rating"],
        timestamp: item["timeStamp"],
        action: {
          type: "internal",
          route: "/pages/profile/profile-overview",
          color: "info",
          label: "Action",
        },
      }
    ));

    console.log("openMenu", Boolean(openMenu));
    console.log("feedbackItems", feedbackItems);


    return (
      <FeedbacksList listitems={feedbackItems} />);
    //     anchorEl={openMenu}
    //     anchorReference={null}
    //     anchorOrigin={{
    //       vertical: "bottom",
    //       horizontal: "left",
    //     }}
    //     open={Boolean(openMenu)}
    //     onClose={handleCloseFeedbacks}
    //     sx={{ mt: 2 }}
    //   >
    //     {notifs}
    //   </FeedbacksList>
    // )
  };


  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    console.log("Inside useEffect");

    if (openFeedbacks) {
      console.log("BEFORE RESTGET");
      restget("/api/feedbacks")
        .then((response) => {
          console.log("FEEDBACK: ", response);
          if (response.hasOwnProperty("error")) {
            // window.location.href = "/login";
          } else {
            setFeedbacks(response["feedbacks"]);
          }
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/";
        });
    }

    if (openProfile) {
      console.log("Get User profile info");
      fetchAuthSession()
        .then((session) => {
          console.log(session);
          console.log("USER: ", session.tokens.idToken.payload.email);
          setUserEmail(session.tokens.idToken.payload.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }


    // useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, [dispatch, openFeedbacks, openProfile]);


  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
                                      functions: { pxToRem },
                                      boxShadows: { buttonBoxShadow },
                                    }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <div>

      {openFeedbacks && (<ConfiguratorRoot variant="permanent" ownerState={{ openFeedbacks, openProfile }}>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={3}
          pb={0.8}
          px={3}
        >
          <SoftBox>
            <SoftTypography variant="h5">Feedback History</SoftTypography>
            <SoftTypography variant="body2" color="text"> From Purple Shield users </SoftTypography>
          </SoftBox>

          <Icon
            sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
              fontSize: `${size.md} !important`,
              fontWeight: `${fontWeightBold} !important`,
              stroke: dark.main,
              strokeWidth: "2px",
              cursor: "pointer",
              mt: 2,
            })}
            onClick={handleCloseFeedbacks}
          >
            close
          </Icon>
        </SoftBox>

        <Divider />
        <div>
          {openFeedbacks && (renderMenu())}
        </div>
      </ConfiguratorRoot>)}
      {openProfile && (<ConfiguratorRoot variant="permanent" ownerState={{ openFeedbacks, openProfile }}>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={3}
          pb={0.8}
          px={3}
        >
          <SoftBox>
            <SoftTypography variant="h5">Profile</SoftTypography>
            <SoftTypography variant="body2" color="text"> {userEmail} </SoftTypography>
          </SoftBox>

          <Icon
            sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
              fontSize: `${size.md} !important`,
              fontWeight: `${fontWeightBold} !important`,
              stroke: dark.main,
              strokeWidth: "2px",
              cursor: "pointer",
              mt: 2,
            })}
            onClick={handleCloseFeedbacks}
          >
            close
          </Icon>
        </SoftBox>
        <Divider />
      </ConfiguratorRoot>)}
    </div>
  );
}

export default FeedbackSideBar;
