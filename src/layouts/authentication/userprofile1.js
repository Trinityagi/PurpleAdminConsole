

import {Authenticator, Heading} from "@aws-amplify/ui-react";
// import router, { useRouter } from 'next/router'
import { signOut, fetchAuthSession, AuthSession } from 'aws-amplify/auth';
import React, {useEffect} from "react";
import { setLayout } from "../../context";

// const router = useRouter();

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//     },
//     greeting: {
//         fontSize: '24px',
//         marginBottom: '20px',
//     },
//     button: {
//         padding: '10px 20px',
//         fontSize: '16px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         position: 'fixed', // Fix the button to the top-left corner
//         top: '10px',
//         right: '10px',
//         zIndex: 10, // Ensure the button stays on top of other elements
//     },
// };


export function UserProfile1(user) {

    console.log("UserProfile1: user", user);

    console.log(window.localStorage.getItem("purple_shield_plugin"));

    useEffect(() => {
        fetchAuthSession().then(session=>{

            //You can print them to see the full objects
            console.log("session", session)
            console.log("id token", session.tokens.idToken.toString())
            console.log("access token", session.tokens.accessToken.toString())
        })
        // window.location.href = "/dashboard";
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
                })
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }



    return <div>

            <button className={"logoutbutton"} onClick={handleSignOut}>
                Sign Out
            </button>

    </div>
}