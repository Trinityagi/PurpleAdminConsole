import { Authenticator, Heading } from "@aws-amplify/ui-react";
// import router, { useRouter } from 'next/router'
import { signOut, fetchAuthSession, AuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { setLayout, useSoftUIController } from "../../context";
import { restget } from "../../restcalls";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import { Icon } from "@mui/material";

export function UserProfile1(user) {

  console.log("UserProfile1: user", user);

  const [authorized, setAuthorized] = useState(false);

  const [controller, dispatch] = useSoftUIController();
  const { pathname } = useLocation();
  useEffect(() => {
    setLayout(dispatch, "error");
  }, [pathname]);

  // useEffect(() => {
  //
  //   restget("/api/authorize")
  //     .then((response) => {
  //       console.log(response);
  //       setAuthorized(true);
  //       window.location.href = "/dashboard";
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setAuthorized(false);
  //       window.location.href = "/auth";
  //     });
  // }, []);

  // If the plugin is installed but not signed-in yet, then signout from Amplify page.
  // purple_shield_plugin = True and trinity_plugin_user not found with user details,
  // then signout from Amplify to show fresh sign-in page.
  // console.log(window.localStorage.getItem("purple_shield_plugin"))
  // if (window.localStorage.getItem("purple_shield_plugin") !== null) {
  //     // plugin found so redirect to intro page instead of signin page
  //     console.log("plugin found so redirect to intro page instead of signin page");
  //     const result = window.localStorage.getItem("trinity_plugin_user");
  //     if(result) {
  //         //Show intro page if already signed-in
  //         console.log(window.localStorage.getItem("trinity_plugin_user"));
  //         window.localStorage.setItem("trinity_plugin_user", JSON.stringify(user));
  //         router.push("/intro");
  //     }
  //     else {
  //         console.log("plugin not found...")
  //         // router.push("/signin");
  //     }
  // }
  // else {
  //     // window.alert("Plugin not found!")
  // }
  // // const purple_shield_plugin = JSON.parse(window.localStorage.getItem("purple_shield_plugin"))


  // console.log(window.localStorage.getItem("trinity_plugin_user"));
  // const router = useRouter();
  // router.push("/intro");


  function handleSignOut() {

    try {
      signOut()
        .then((response) => {
          console.log("signout response: ", response);
          // runtime.sendMessage({
          //     request: "trinity-signout-notif",
          // }).then((response) => {
          //     console.log(response);
          // });
        })
        .catch((err) => {
          console.log("Error during signout");
        });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar notifCount={0} />
      <SoftBox flexDirection="column"  p={10}>
        <SoftBox flexDirection="row" display="flex" alignItems="center">
        <Icon color={"error"}>error</Icon>
          <SoftTypography color={"text"}>Server Unreachable.</SoftTypography>
        </SoftBox>


        <SoftTypography variant="caption" color={"text"}>Please refresh the page or try again later. If the problem persists, contact support.</SoftTypography>

      </SoftBox>
    </DashboardLayout>
  );


}