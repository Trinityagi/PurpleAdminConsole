// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Playground React components
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Playground React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import Footer from "components/Footer";
import MiniStatisticsCard from "components/StatisticsCards/MiniStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import GradientLineChart from "components/GradientLineChart";
import ReactSpeedometer from "react-d3-speedometer";
import Table from "examples/Tables/Table";
import SoftMenuItem from 'components/SoftMenuItem'

// Soft UI Playground React base styles
import typography from "assets/theme/base/typography";

import users_icon from "../../assets/images/users.svg";
import latency_icon from "../../assets/images/latency.svg";
import protection_icon from "../../assets/images/protected entities.svg";
import utilization_icon from "../../assets/images/utilization.svg";
import test_icon from "../../assets/images/trinity_agi_logo.svg";

import {restget} from "../../restcalls";
import TimelineList from "components/Timeline/TimelineList";
import TimelineItem from "components/Timeline/TimelineItem";
import SoftInput from "../../components/SoftInput";
import { Chip, InputLabel, OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SoftButton from "../../components/SoftButton";
import DefaultBlogCard from "../../components/DefaultBlogCard";

import examples from "./data/examples"

function Playground() {
  const { size } = typography;

  const [cardsData, setCardsData] = useState({"total_users": 0, "eff_policy": 0, "p95_latency": 0.0, "peek_util": 0, "feedbacks_count": 0});
  const [chartDataset, setChartDataset] = useState([0, 0, 0]);
  const [queryCounts, setQueryCounts] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [prompt, setPrompt] = useState("");

  function onExamplesCard(title, description) {
    setPrompt(description);
  }

  const example_cards = examples.map((item, index) => {
    return (<Grid key={index} item xs={10} lg={2} sm={6} md={6} >
      <DefaultBlogCard  action={"internal"} title={item.title} description={item.description} onClick={onExamplesCard}></DefaultBlogCard>
    </Grid>);
  })

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

  console.log("queryCounts: ", queryCounts);
  let x_axis = []
  let y1_axis = []
  let y2_axis = []
  Object.keys(queryCounts).forEach(function(key) {
    const date1 = new Date(key);
    x_axis.push(date1.toLocaleString('default', { month: 'short' }) + " " + date1.getDate());

    y1_axis.push(queryCounts[key]);

  })

  console.log(cardsData);
  console.log(cardsData.active_users_counts);

  if(!cardsData.hasOwnProperty("active_users_counts")){
    cardsData["active_users_counts"] = []
  }

  Object.keys(cardsData.active_users_counts).forEach(function(key) {
    const date1 = new Date(key);
    // x_axis.push(date1.toLocaleString('default', { month: 'short' }) + " " + date1.getDate());

    y2_axis.push(cardsData.active_users_counts[key]);

  })

  console.log(x_axis);
  console.log(y1_axis);
  console.log(y2_axis);

  const dailyUsage = {
    labels: x_axis,
    datasets: [
      {
        label: "Queries",
        color: "info",
        data: y1_axis,
      },
      {
        label: "Active Users",
        color: "dark",
        data: y2_axis,
      },
    ],
  };

  useEffect(() => {

    restget("/api/dashboard")
      .then((response) => {
        console.log(response);
        if(response.hasOwnProperty("error")) {
          window.location.href = "/error";
        }
        else{
          setCardsData(response['dashboard_data']);
          setChartDataset(response.dashboard_data.chart_data_set);
          setQueryCounts(response.dashboard_data.query_counts);
          // setActiveUsersCounts(response.dashboard_data.active_users_count);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/error";
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

  const names = [
    'GPT4',
    'GPT3',
    'llama13b',
    'llama70b',
    'Presidio',
    'Claude',
    'Mixtral'
  ];
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  console.log("cardsData: ", cardsData);
  return (
    <DashboardLayout>
      <DashboardNavbar notifCount={cardsData['feedbacks_count']} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2} xl={2}>
              <SoftTypography id="compare-label" variant={"button"}>Compare with:</SoftTypography>
              <Select
                labelId="compare-label"
                id="compare"
                value={"GPT3"}
                label="Compare"
                onChange={() => {}}
              >
                <MenuItem value={"GPT4"}>GPT4</MenuItem>
                <MenuItem value={"GPT3"}>GPT3</MenuItem>
                <MenuItem value={"llama13b"}>LLama 13b</MenuItem>
                <MenuItem value={"llama70b"}>LLama 70b</MenuItem>
                <MenuItem value={"Presidio"}>Presidio</MenuItem>
                <MenuItem value={"Claude"}>Claude</MenuItem>
                <MenuItem value={"Mixtral"}>Mixtral</MenuItem>
              </Select>
            </Grid>
            </Grid>

        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3} >
            {/* <Grid item xs={12} lg={7}> */}
            <Grid item xs={10} lg={6} sm={6} md={6} >
              <SoftBox justifyDirection={"column"} >
                <SoftInput placeholder="Type here..." value={prompt} multiline rows={15} />
              </SoftBox>
            </Grid>
            <Grid item xs={10} lg={6} sm={6} md={6} >
              <SoftInput value={prompt} multiline rows={15} />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container justifyContent="center" spacing={3} >
            {example_cards}
          </Grid>
        </SoftBox>
        <SoftButton color="button">Run</SoftButton>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Playground;
