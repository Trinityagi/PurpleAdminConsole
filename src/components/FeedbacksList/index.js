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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Rating } from "@mui/material";
import SoftBadge from "../SoftBadge";

function FeedbacksList({ listitems }) {
  console.log(listitems);
  const renderProfiles = listitems.map(({ name, description, rating, problem, timestamp, action }, index) => (
    <SoftBox key={index} component="li" display="flex" py={1} mb={1} flexDirection="row"  justifyContent="space-between">
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >

        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>

        <Rating value={rating} size={"small"}></Rating>
        <SoftBadge variant="gradient" badgeContent={problem} color="secondary" size="xs" container/>
        <SoftBox>
        <SoftTypography  variant="caption" color="text">
          {description}
        </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox display="flex" py={0.5}>
        <SoftTypography variant={"caption"} >{timestamp}</SoftTypography>
      </SoftBox>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the FeedbacksList
FeedbacksList.propTypes = {
  listitems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FeedbacksList;
