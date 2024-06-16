// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import Footer from "components/Footer";
import MiniStatisticsCard from "components/StatisticsCards/MiniStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import ReactSpeedometer from "react-d3-speedometer";
import Table from "examples/Tables/Table";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

import users_icon from "../../assets/images/users.svg";
import latency_icon from "../../assets/images/latency.svg";
import protection_icon from "../../assets/images/protected entities.svg";
import utilization_icon from "../../assets/images/utilization.svg";
import test_icon from "../../assets/images/trinity_agi_logo.svg";

import {restget} from "../../restcalls";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;

  const [cardsData, setCardsData] = useState({"total_users": 0, "eff_policy": 0, "p95_latency": 0.0, "peek_util": 0, "feedbacks_count": 0});
  const [chartDataset, setChartDataset] = useState([0, 0, 0]);

  console.log(chartDataset);
  let labels = [];
  let data = [];
  for (const key in chartDataset) {
    const item = chartDataset[key];
    labels = labels.concat(Object.keys(item))
    data = data.concat(Object.values(item))
  }
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Protected',
        data: data,
        color: 'primary',
      },
    ],
  };
  const columns = [
    { name: 'User Group', align: 'center'}, // Define column names, alignment, and optional width
    { name: 'Service Usage', align: 'center'},
  ];

  useEffect(() => {

    restget("/api/dashboard")
      .then((response) => {
        console.log(response);
        if(response.hasOwnProperty("error")) {
          window.location.href = "/auth";
        }
        else{
          setCardsData(response['dashboard_data'])
          setChartDataset(response.dashboard_data.chart_data_set)
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/auth";
      });
  }, [])
  
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

  console.log("cardsData: ", cardsData);
  return (
    <DashboardLayout>
      <DashboardNavbar notifCount={cardsData['feedbacks_count']} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Users" }}
                count={cardsData['total_users']}
                percentage={{ color: "success", text: cardsData["users_added"] }}
                icon={users_icon}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Protected entities" }}
                count={cardsData["eff_policy"]}
                percentage={{ color: "success", text: cardsData["eff_policy_plus"] }}
                icon={protection_icon}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "P95 Latency" }}
                count={cardsData["p95_latency"] + "s"}
                percentage={{ color: "error", text: cardsData["p95_latency_delta"]? cardsData["p95_latency_delta"]:"0" + "%"}}
                icon={latency_icon}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Peak Utilization" }}
                count={cardsData["peek_util"]}
                percentage={{ color: "success", text: cardsData["peak_util_delta"]? cardsData["peak_util_delta"]:"0" + "%" }}
                icon={utilization_icon}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={7}> */}
            <Grid item  xs={10} lg={6}>
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
                // height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
            <Grid item lg={6}>
              <HorizontalBarChart
              title="Top Effective Policy"
              chart={chartData}
              height="21.4rem"
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
          <Grid item xs={12} md={6} lg={6}>
            <Table columns={columns} rows={rows} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
