/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

import SoftBadge from "../../../components/SoftBadge";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const policiesData = {
  columns: [
    { name: "policy", align: "left" },
    { name: "intervention", align: "left" },
    { name: "endpoints", align: "left" },
    { name: "usergroup", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      policy: "Personal Information Safeguard",
      intervention: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Shallow Mark
        </SoftTypography>
      ),
      endpoints: (
        <SoftBox >
        <SoftBadge variant="gradient" badgeContent="OpenAI" color="warning" size="xs"  />
        <SoftBadge variant="gradient" badgeContent="Claude" color="text" size="xs"  />
        </SoftBox>
      ),
      usergroup: (
        <SoftBox >
          <SoftBadge variant="gradient" badgeContent="HR Group" color="white" size="xs"  />
          <SoftBadge variant="gradient" badgeContent="Test" color="white" size="xs"  />
        </SoftBox>
      ),
      action,
    },
    {
      policy: "Business Information Shield",
      intervention: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Shallow Mark
        </SoftTypography>
      ),
      endpoints: (
        <SoftBox >
          <SoftBadge variant="gradient" badgeContent="OpenAI" color="success" size="xs"  />
        </SoftBox>
      ),
      usergroup: (
        <SoftBox >
          <SoftBadge variant="gradient" badgeContent="All" color="white" size="xs"  />
        </SoftBox>
      ),
      action,
    },

    {
      policy: "IP Protection",
      intervention: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Block
        </SoftTypography>
      ),
      endpoints: (
        <SoftBox >
          <SoftBadge variant="gradient" badgeContent="Except Copilot" color="secondary" size="xs"  />
        </SoftBox>
      ),
      usergroup: (
        <SoftBox >
          <SoftBadge variant="gradient" badgeContent="All" color="white" size="xs"  />
        </SoftBox>
      ),
      action,
    },
  ],
};

export default policiesData;
