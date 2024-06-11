import { Authenticator, Heading } from "@aws-amplify/ui-react";
// import router, { useRouter } from 'next/router'
import { signOut, fetchAuthSession, AuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { setLayout } from "../../context";
import { restget } from "../../restcalls";

export function UserProfile1(user) {

  console.log("UserProfile1: user", user);

  const [authorized, setAuthorized] = useState(false);


  useEffect(() => {

    restget("/api/authorize")
      .then((response) => {
        console.log(response);
        setAuthorized(true);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        setAuthorized(false);
        window.location.href = "/auth";
      });
  }, []);

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


  return <div>

    <button className={"logoutbutton"} onClick={handleSignOut}>
      Sign Out
    </button>
    {authorized && (<div>You are unauthorized!</div>)}

  </div>;
}