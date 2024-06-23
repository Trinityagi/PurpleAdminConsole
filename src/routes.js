/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/policies";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";

import CognitoSignIn from "layouts/authentication/cognitosignin"
import { Authorization } from "layouts/authentication/authorization";

import SignIn from "layouts/authentication2/sign-in";
import SignUp from "layouts/authentication2/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import {Dashboard as DashboardIcon, Groups, Timeline, Policy, Preview} from "@mui/icons-material"
import { UserProfile1 } from "./layouts/authentication/userprofile1";
import Playground from "./layouts/playground";

const routes = [

  {
    type: "collapse",
    name: "Error Page",
    key: "error",
    route: "/error",
    component: <UserProfile1 />,
    noCollapse: true,
    sidebar: false
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    sidebar: true
  },
  {
    type: "collapse",
    name: "Policy",
    key: "policies",
    route: "/policies",
    icon: <Policy size="12px" />,
    component: <Tables />,
    noCollapse: true,
    sidebar: true
  },
  {
    type: "collapse",
    name: "Monitoring",
    key: "billing",
    route: "/billing",
    icon: <Timeline size="12px" />,
    component: <Billing />,
    noCollapse: true,
    sidebar: true
  },
  {
    type: "collapse",
    name: "Playground",
    key: "playground",
    route: "/playground",
    icon: <Preview size="12px" />,
    component: <Playground />,
    noCollapse: true,
    sidebar: true
  },
  {
    type: "collapse",
    name: "User Groups",
    key: "profile",
    route: "/profile",
    icon: <Groups size="12px" />,
    component: <Profile />,
    noCollapse: true,
    sidebar: true
  },
];

export default routes;
