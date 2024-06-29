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
import SoftMenuItem from "components/SoftMenuItem";

// Soft UI Playground React base styles
import typography from "assets/theme/base/typography";

import users_icon from "../../assets/images/users.svg";
import latency_icon from "../../assets/images/latency.svg";
import protection_icon from "../../assets/images/protected entities.svg";
import utilization_icon from "../../assets/images/utilization.svg";
import test_icon from "../../assets/images/trinity_agi_logo.svg";

import { restget, restpost } from "../../restcalls";
import TimelineList from "components/Timeline/TimelineList";
import TimelineItem from "components/Timeline/TimelineItem";
import SoftInput from "../../components/SoftInput";
// import { Chip, InputLabel, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SoftButton from "../../components/SoftButton";
import DefaultBlogCard from "../../components/DefaultBlogCard";

import examples from "./data/examples";
import { FormControl, InputLabel } from "@mui/material";

let CONV_ITEM = {
  query: "",
  query_d: "",
  out_text: "",
  out_text_d: "",
};

function Playground() {
  const { size } = typography;

  const [cardsData, setCardsData] = useState({
    "total_users": 0,
    "eff_policy": 0,
    "p95_latency": 0.0,
    "peek_util": 0,
    "feedbacks_count": 0,
  });

  const [chartDataset, setChartDataset] = useState([0, 0, 0]);
  const [queryCounts, setQueryCounts] = useState([]);
  const [compareModel, setCompareModel] = useState("presidio");
  const [prompt, setPrompt] = useState("");

  const [convCount1, setConvCount1] = useState(0);
  const [convCount2, setConvCount2] = useState(0);
  const [conversations1, setConversations1] = useState([]);
  const [conversations2, setConversations2] = useState([]);
  const [timeline1, setTimeline1] = useState("");
  const [timeline2, setTimeline2] = useState("");

  function addConvItem(view, query, query_d, out_text, out_text_d) {
    console.log("query_d: ", query_d);
    console.log("out_text_d: ", out_text_d);

    if (view === 1) {
      conversations1.push({ query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d });
      console.log(conversations1);
      setConversations1(conversations1);
      setConvCount1(convCount1 + 1);
    } else if (view === 2) {
      conversations2.push({ query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d });
      console.log(conversations2);
      setConversations1(conversations2);
      setConvCount2(convCount2 + 1);
    }
  }

  function clearContents() {
    console.log("on clearContents");
    setTimeline1("");
    setConversations1([]);
    setTimeline2("");
    setConversations2([]);
    setPrompt("");
    setConvCount1(0);
    setConvCount2(0);
    console.log("on clearContents end");

  }

  function onExamplesCard(title, description) {
    setPrompt(description);
  }

  function runQuery() {

    console.log(compareModel);

    let payload1 = {
      text: prompt,
      llm_endpoint: "completions-gpt4",
      safety_model: "openchat",
      settings: {},
    };

    restpost("/api/query", payload1).then((response) => {
      console.log(response);
      if (!response.hasOwnProperty("error")) {
        addConvItem(1, prompt, response["result"]["query_d"], response["result"]["out_text"], response["result"]["out_text_d"]);
      }

    });

    let payload2 = {
      text: prompt,
      llm_endpoint: "completions-gpt4",
      safety_model: compareModel,
      settings: {},
    };
    restpost("/api/query", payload2).then((response) => {
      console.log(response);
      if (!response.hasOwnProperty("error")) {
        addConvItem(2, prompt, response["result"]["query_d"], response["result"]["out_text"], response["result"]["out_text_d"]);
      }
    });
  }

  const example_cards = examples.map((item, index) => {
    return (<Grid key={index} item xs={10} lg={2} sm={6} md={6}>
      <DefaultBlogCard title={item.title} description=""
                       onClick={onExamplesCard}></DefaultBlogCard>
    </Grid>);
  });

  let labels = [];
  let data = [];
  for (const key in chartDataset) {
    const item = chartDataset[key];
    labels = labels.concat(Object.keys(item));
    data = data.concat(Object.values(item));
  }

  // useEffect(() => {
  //
  //   restget("/api/dashboard")
  //     .then((response) => {
  //       console.log(response);
  //       if (response.hasOwnProperty("error")) {
  //         window.location.href = "/error";
  //       } else {
  //         setCardsData(response["dashboard_data"]);
  //         setChartDataset(response.dashboard_data.chart_data_set);
  //         setQueryCounts(response.dashboard_data.query_counts);
  //         // setActiveUsersCounts(response.dashboard_data.active_users_count);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       window.location.href = "/error";
  //     });
  // }, []);

  useEffect(() => {
    console.log("Timeline updation started");

    const timeline = conversations1.map((item, index) => (
      <div key={index}>
        <TimelineItem
          color="success"
          description={item.query_d}
          icon="person"
        />
        <TimelineItem
          color="error"
          icon="cloud"
          description={item.out_text_d}
          badges={["Data Utility Loss: 0", "Masked: 6"]}
        />
      </div>
    ));

    setTimeline1(timeline);

  }, [convCount1]);

  useEffect(() => {
    console.log("Timeline updation started for view 2");

    const timeline = conversations2.map((item, index) => (
      <div key={index}>
        <TimelineItem
          color="success"
          description={item.query_d}
          icon="person"
        />
        <TimelineItem
          color="error"
          icon="cloud"
          description={item.out_text_d}
          badges={["Data Utility Loss: 0", "Masked: 6"]}
        />
        <TimelineItem
          color="success"
          description={item.query}
          icon="person"
        />
        <TimelineItem
          color="error"
          icon="cloud"
          description={item.out_text}
          badges={["Data Utility Loss: 0", "Masked: 6"]}
        />
      </div>
    ));

    setTimeline2(timeline);

  }, [convCount2]);

  const rows = [
    {
      "User Group": "HR Group",
      "Service Usage": "53%",
    },
    {
      "User Group": "Special Project Group",
      "Service Usage": "35%",
    },
    {
      "User Group": "Dev Team",
      "Service Usage": "12%",
    },
  ];

  const compare_models = {
    "gpt4": "GPT4",
    "gpt3": "GPT3",
    "llama13b": "Llama13b",
    "llama70b": "Llama70b",
    "presidio": "Presidio",
    "claude": "Claude",
    "mixtral": "Mixtral",
  };

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

  return (
    <DashboardLayout>
      <DashboardNavbar notifCount={cardsData["feedbacks_count"]} />
      <Grid id={"playground"} container spacing={2} xs={10} sx={{
        width: 1,
        height: 1,
        borderRadius: 1,
        bgcolor: "grey.200",
        "&:hover": {
          bgcolor: "grey.300",
        },
      }}>
        <Grid id={"conv_item"} item xs={8}>
          <Grid id={"conv"} container spacing={2} >
            <Grid item xs={5} sm={5}>
              <SoftBox rows={15}>
                <TimelineList title="Purple Model">
                  {timeline1}
                </TimelineList>
              </SoftBox>
            </Grid>
            <Grid item xs={5} sm={5}>
              <SoftBox rows={15}>
                <TimelineList title={compare_models[compareModel]}>
                  {timeline2}
                </TimelineList>
              </SoftBox>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" spacing={2}>
                {example_cards}
              </Grid>
            </Grid>
            <Grid item xs={9} xl={9}>
              <SoftInput placeholder="Type here..." value={prompt} multiline rows={3} onChange={(event) => {
                setPrompt(event.target.value);
              }} />
            </Grid>
            <Grid item xs={2} justifyItems={"flex-end"}>
              <SoftButton color="primary" onClick={runQuery}><Icon
                sx={{ fontWeight: "bold" }}>send</Icon>&nbsp;&nbsp;Run</SoftButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid id={"settings"} item xs={2} >

            <Grid container xs={2} spacing={0}>
              <Grid items >
                <SoftTypography id="compare-label" variant="caption" htmlFor="compare">Compare with:</SoftTypography>
                <Select
                  labelId="compare-label"
                  id="compare"
                  value={compareModel}
                  label="Compare"
                  onChange={(event) => {
                    console.log(event);
                    setCompareModel(event.target.value);
                  }}
                >
                  {Object.keys(compare_models).map((item, index) => (
                    <MenuItem key={index} value={item}>{compare_models[item]}</MenuItem>))}
                </Select>
              </Grid>

              <Grid xs={1} sm={1} item>
                <SoftButton iconOnly variant={"contained"} onClick={clearContents}><Icon>delete</Icon></SoftButton>
              </Grid>
            </Grid>
        </Grid>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Playground;
