
import fetch from "isomorphic-fetch";

const BACKEND_HOST = "https://pshield.trinityagi.com";
// const BACKEND_HOST = "http://localhost:8000";

export function restget(endpoint) {
  let user_details = { "trinity_plugin_user": "" };

  console.log("Make rest api call to the backend for dashboard data");
  const url = BACKEND_HOST + endpoint;

  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Id": user_details["trinity_plugin_user"],
    }
  };

  console.log(url);

  return fetch(url, body)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    })

}



