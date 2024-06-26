import fetch from "isomorphic-fetch";
import { signOut, fetchAuthSession, AuthSession } from "aws-amplify/auth";

// const BACKEND_HOST = "https://pshield.trinityagi.com";
const BACKEND_HOST = "http://localhost:8000";

export async function restget(endpoint) {
  let user_details = { "trinity_plugin_user": "" };

  console.log("Make rest api call to the backend for dashboard data");
  const url = BACKEND_HOST + endpoint;

  let token = "";

  try {
    const session = await fetchAuthSession();
    console.log(session);
    token = session.tokens?.idToken?.toString();
    console.log("Token: ", token);
  } catch (err) {
    return { "error": 401, "message": "Please log in to proceed." };
  }


  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Id": user_details["trinity_plugin_user"],
      "Authorization": "Bearer " + token,
    },
  };

  console.log(body);

  console.log(url);

  return fetch(url, body)
    .then((response) => {
      console.log(response);
      console.log(response.status);
      if (response.status !== 200) {
        return { "error": response.status, "message": response.statusText };
      }
      return response.json();
    })
    // .catch((err) => {
    //   console.log(err);
    //   return err;
    // });

}

export async function restpost(endpoint, payload) {
  let user_details = { "trinity_plugin_user": "" };

  console.log("Make rest POST: ", payload);
  const url = BACKEND_HOST + endpoint;

  let token = "";

  try {
    const session = await fetchAuthSession();
    console.log(session);
    token = session.tokens?.idToken?.toString();
    console.log("Token: ", token);
  } catch (err) {
    return { "error": 401, "message": "Please log in to proceed." };
  }

  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Id": user_details["trinity_plugin_user"],
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(payload)
  };

  console.log(body);

  console.log(url);

  return fetch(url, body)
    .then((response) => {
      console.log(response);
      console.log(response.status);
      if (response.status !== 200) {
        return { "error": response.status, "message": response.statusText };
      }
      return response.json();
    })
  // .catch((err) => {
  //   console.log(err);
  //   return err;
  // });

}



