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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Timeline context
import { TimelineProvider } from "components/Timeline/context";
import { CardContent, Paper } from "@mui/material";

function TimelineList({ title, selectControl, dark, children }) {
  return (
    <TimelineProvider value={dark}>
      <Card sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
      }}>
        <SoftBox height="450px" bgColor={dark ? "dark" : "white"} variant="gradient" >
          <SoftBox pt={1} px={3} display="flex" gap alignItems="center">
            <SoftTypography variant={"button"} verticalAlign={"middle"} fontWeight="medium" color={dark ? "white" : "dark"}>
              {title}
            </SoftTypography>
            <SoftBox sx={{ width: "150px" }} >{selectControl}</SoftBox>

          </SoftBox>
          <Paper elevation={0} sx={{
            display: "flex",
            maxHeight: 400,
            flexDirection: "column",
            overflow: "auto",
            overflowY: "auto",
            marginBottom: 1
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}>
          <SoftBox p={2} >{children}</SoftBox>
          </Paper>
        </SoftBox>
      </Card>
    </TimelineProvider>
  );
}

// Setting default values for the props of TimelineList
TimelineList.defaultProps = {
  dark: false,
};

// Typechecking props for the TimelineList
TimelineList.propTypes = {
  title: PropTypes.string,
  dark: PropTypes.bool,
  children: PropTypes.node,
  selectControl: PropTypes.node,
};

export default TimelineList;
