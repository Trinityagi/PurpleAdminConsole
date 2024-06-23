// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import Footer from "components/Footer";

// Data
import SoftTypography from "../../components/SoftTypography";
import Table from "../../examples/Tables/Table";
import policiesData from "./data/policiesData";
import { useEffect, useState } from "react";
import { restget } from "../../restcalls";
import SoftButton from "../../components/SoftButton";

function Tables() {
  const { columns: prCols, rows: prRows } = policiesData;
  const [cardsData, setCardsData] = useState({"total_users": 0, "eff_policy": 0, "p95_latency": 0.0, "peek_util": 0, "feedbacks_count": 0});

  useEffect(() => {

    restget("/api/dashboard")
      .then((response) => {
        console.log(response);
        if(response.hasOwnProperty("error")) {
          window.location.href = "/error";
        }
        else{
          setCardsData(response['dashboard_data']);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/error";
      });
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar notifCount={cardsData['feedbacks_count']} />
      <SoftBox display="flex" justifyContent="flex-end">
      <SoftButton color={"primary"}>+ Add Policy</SoftButton>
      </SoftBox>
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Policies</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
