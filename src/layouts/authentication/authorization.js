

import {Authenticator, Heading} from "@aws-amplify/ui-react";
// import router, { useRouter } from 'next/router'
import { signOut, fetchAuthSession, AuthSession } from 'aws-amplify/auth';
import React, { useEffect, useState } from "react";
import { setLayout, useSoftUIController } from "../../context";
import {restget} from "../../restcalls";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/LayoutContainers/PageLayout";
import SoftBox from "../../components/SoftBox";
import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import SoftTypography from "../../components/SoftTypography";
import SoftButton from "../../components/SoftButton";

export function Authorization(user) {

  console.log("Authorization: user", user);

  const [controller, dispatch] = useSoftUIController();
  const { pathname } = useLocation();
  useEffect(() => {
    setLayout(dispatch, "auth");
  }, [pathname]);

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


  return <PageLayout>
    <DashboardNavbar notifCount={0} />

    <SoftBox  px={50} py={10}>
      <SoftTypography variant="body1" color="black" fontWeightBold verticalAlign>
        You are unauthorized!!!
      </SoftTypography>
    </SoftBox>
    <a title={"Login again"} href={"/login"}/>

  </PageLayout>
}