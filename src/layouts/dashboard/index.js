// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import ReactSpeedometer from "react-d3-speedometer";
import Table from "examples/Tables/Table";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const chartData = {
    labels: ['Personal Data', 'intellectual Property', 'Personal Data', 'Code Snippet'],
    datasets: [
      {
        label: 'My Data',
        data: [0,200,400,600,800],
        color: 'primary',
      },
    ],
  };
  const columns = [
    { name: 'User Group', align: 'center'}, // Define column names, alignment, and optional width
    { name: 'Service Usage', align: 'center'},
  ];
  
  const rows = [
    {
      'User Group': 'HR Group',
      'Service Usage': '53%',
    },
    {
      'User Group': 'Special Project Group',
      'Service Usage': '35%',
    },
    {
      'User Group': 'Dev Team',
      'Service Usage': '12%',
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Users" }}
                count="100"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Effective Policy" }}
                count="4"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "P95 Latency" }}
                count="1.8s"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Peak Utilization" }}
                count="80%"
                percentage={{ color: "success", text: "+5%" }}
                icon={{color: "info",component: "shopping_cart",}}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid> */}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Daily Usage"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <HorizontalBarChart
              title="Top Effective Policy"
              chart={chartData}
            />
            </Grid>
          </Grid>
        </SoftBox>
        <div>Service Health</div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ReactSpeedometer 
            segments={1}
            segmentColors={["purple",]}
            value={800}
            currentValueText={"Infra Health"}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ReactSpeedometer 
            segments={1}
            segmentColors={["gray",]}
            value={500}
            currentValueText={"Policy Health"}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Table columns={columns} rows={rows} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
