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

function Tables() {
  const { columns: prCols, rows: prRows } = policiesData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
