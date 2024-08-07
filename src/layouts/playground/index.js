// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';

// Soft UI Playground React components
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Playground React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";
import Footer from "components/Footer";

// Soft UI Playground React base styles
import typography from "assets/theme/base/typography";

import { restget, restpost } from "../../restcalls";
import TimelineList from "components/Timeline/TimelineList";
import TimelineItem from "components/Timeline/TimelineItem";
import SoftInput from "../../components/SoftInput";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SoftButton from "../../components/SoftButton";
import DefaultBlogCard from "../../components/DefaultBlogCard";

import examples from "./data/examples";
import IconButton from "@mui/material/IconButton";
import { CheckBox } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
  const [open, setOpen] = useState(false);

  const [convCount1, setConvCount1] = useState(0);
  const [convCount2, setConvCount2] = useState(0);
  const [summarizationData, setSummarizationData] = useState([])

  const [conversations1, setConversations1] = useState([]);
  const [conversations2, setConversations2] = useState([]);
  const [timeline1, setTimeline1] = useState("");
  const [timeline2, setTimeline2] = useState("");

  function addConvItem(view, query, query_d, out_text, out_text_d, dul, maskedCount, hasResponse=false) {
    console.log("query_d: ", query_d);
    console.log("out_text_d: ", out_text_d);

    if (view === 1) {
      if(hasResponse === false) {
        console.log("adding 1");
        let conversation = { query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d, dul: 0, masked_count: maskedCount, has_response: false }
        conversations1.push(conversation);
      }
      else {
        console.log("updating 1");
        let old_conversation = conversations1.pop();
        if(query) {
          // if the update is with query data
          let conversation = { query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d, dul: 0, masked_count: maskedCount, has_response: true }
          conversations1.push(conversation);
        }
        else {
          // if the update is only with summarization data, without query data
          console.log("old_conversation1: ", old_conversation);
          console.log("conversations1: ", conversations1);
          old_conversation["dul"] = dul;
          old_conversation["masked_count"] = maskedCount;
          conversations1.push(old_conversation);
        }
      }

      console.log("Conversation1: ", conversations1);
      setConversations1(conversations1);
      setConvCount1(convCount1 + 1);
      updateTimeline(1);

    } else if (view === 2) {
      if(!hasResponse) {
        console.log("adding 2");
        let conversation = { query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d, dul: 0, masked_count: maskedCount, has_response: false }
        conversations2.push(conversation);
      }
      else {
        console.log("updating 2");
        let old_conversation = conversations2.pop();
        if(query) {
          let conversation = { query: query, query_d: query_d, out_text: out_text, out_text_d: out_text_d, dul: 0, masked_count: maskedCount, has_response: true }
          conversations2.push(conversation);
        }
        else {
          // if the update is only with summarization data, without query data
          console.log("conversations2: ", conversations2);
          console.log("old_conversation2: ", old_conversation);
          old_conversation["dul"] = dul;
          old_conversation["masked_count"] = maskedCount;
          conversations2.push(old_conversation);
        }

      }
      console.log("Conversation2: ", conversations2);
      setConversations2(conversations2);
      setConvCount2(convCount2 + 1);

      updateTimeline(2);
    }
  }

  function updateTimeline(view) {
    /*
    view 1 - for Purple Model conversation timeline
    view 2 - for the compare model converation timeline

     */

    if(view === 1) {
      let conversations1_rev = conversations1.toReversed()

      const timeline = conversations1_rev.map((item, index) => (
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
            waiting={!item.has_response}
            badges={["Data Utility Loss: " + + item.dul, "Masked: " + item.masked_count]}
          />
        </div>
      ));

      setTimeline1(timeline);
    }
    else if (view === 2) {
      let conversations2_rev = conversations2.toReversed()

      const timeline = conversations2_rev.map((item, index) => (
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
            waiting={!item.has_response}
            badges={["Data Utility Loss: " + item.dul, "Masked: " + item.masked_count]}
          />
        </div>
      ));

      setTimeline2(timeline);
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
    console.log("onExamplesCard: ", description)
    setPrompt(description);
  }

  function getSummarization(response) {

    console.log("getSummarization: ", response);

    if(response)
      summarizationData.push(response);

    console.log("summarizationData: ", summarizationData);

    if (summarizationData.length === 3) {
      /*
      If the length is 3, then assume we have responses from purple_model, compare_model and openai, else wait for next call
       */
      let url = "/api/summarization";
      restpost(url, {responses: summarizationData})
        .then((response) => {
          console.log("getSummarization: response: ", response);
          if (response.hasOwnProperty("error") && response.error.status === 401) {
            return {"error": response.error.status}
          }

          addConvItem(1, null, null, null, null, response["response"]["summarization_trinity"]["drop_rate_percent"], response["response"]["summarization_trinity"]["len_mapping"], true);
          addConvItem(2, null, null, null, null, response["response"]["summarization_compare_model"]["drop_rate_percent"], response["response"]["summarization_compare_model"]["len_mapping"], true);
          // setDropRate1((response['response']['summarization_trinity']['drop_rate_percent']).toString() + "%")
          // setDropRate2((response['response']['summarization_compare_model']['drop_rate_percent']).toString() + "%")
        })
        .catch((err) => {
          return {"error": err.toString()}
        })
    }


  }

  function runQuery() {

    console.log(compareModel);

    setSummarizationData([])
    addConvItem(1, prompt, prompt, "Working...", "Working...", 0, 0, false);
    addConvItem(2, prompt, prompt, "Working...", "Working...", 0, 0, false);

    let payload1 = {
      text: prompt,
      policy: "Protect Personal Information, Protect Business Information, Protect Intellectual Property",
      safety_model: "openchat",
      settings: {},
    };

    restpost("/api/query", payload1).then((response) => {
      console.log(response);
      if (!response.hasOwnProperty("error")) {
        const keys1 = Object.keys(response["result"]["label_mappings"]).filter((item) => {
          return item.startsWith("[")
        })
        let masked_count = keys1.length.toString();
        addConvItem(1, prompt, response["result"]["query_d"], response["result"]["out_text"], response["result"]["out_text_d"], 0, masked_count, true);
        getSummarization({purple_response: response["result"]["out_text"], "prompt": prompt, label_mappings: response["result"]["label_mappings"]})
      }
      else {
        addConvItem(1, prompt, prompt, "Error!", "Error!", 0, 0,true);
      }
    });

    let payload2 = {
      text: prompt,
      policy: "Protect Personal Information, Protect Business Information, Protect Intellectual Property",
      safety_model: compareModel,
      settings: {},
    };
    restpost("/api/query", payload2).then((response) => {
      console.log(response);
      if (!response.hasOwnProperty("error")) {
        const keys1 = Object.keys(response["result"]["label_mappings"]).filter((item) => {
          return item.startsWith("[")
        })
        let masked_count = keys1.length.toString();
        addConvItem(2, prompt, response["result"]["query_d"], response["result"]["out_text"], response["result"]["out_text_d"], 0, masked_count, true);
        getSummarization({compare_model_response: response["result"]["out_text"], label_mappings: response["result"]["label_mappings"]})
      }
      else {
        addConvItem(2, prompt, prompt, "Error!", "Error!", 0, 0, true);
      }
    });

    let payload3 = {
      query: prompt,
    };
    restpost("/api/openaiquery", payload3).then((response) => {
      console.log(response);
      if(response.hasOwnProperty("result")) {
        getSummarization({"openai_response": response["result"]})
      }
      else {
        window.alert("Failed to get summarization due to error: " + response['error'].toString());
      }

    });

  }

  const handleClickOpen = () => {
    console.log("handleClickOpen");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  function settingsDialog() {
    return (
      <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Playground Settings
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers >
        <Grid container spacing={3} padding={"1rem"} >
          <Grid items padding={"1rem"} >
            <SoftTypography variant={"body2"}>
              Customize the playground.
            </SoftTypography>
          </Grid>
          <Grid items xs={8} padding={"1rem"} >
            <SoftTypography variant={"h5"}>Policies</SoftTypography>
            <SoftBox display={"flex"} justifyContent="space-between" >
            <SoftTypography variant={"body2"} >Protect Personal Information</SoftTypography>
            <CheckBox></CheckBox>
            </SoftBox>
            <SoftBox display={"flex"} justifyContent="space-between" >
            <SoftTypography variant={"body2"} >Protect Business Information</SoftTypography>
            <CheckBox></CheckBox>
            </SoftBox>
            <SoftBox display={"flex"} justifyContent="space-between" >
            <SoftTypography variant={"body2"} >Protect Intellectual Property</SoftTypography>
            <CheckBox></CheckBox>
            </SoftBox>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <SoftButton autoFocus onClick={handleSave}>
          Save changes
        </SoftButton>
      </DialogActions>
    </BootstrapDialog>);
  }

  let settingsDialogItem = settingsDialog()

  const example_cards = examples.map((item, index) => {
    return (
      <DefaultBlogCard key={index} action={"internal"} title={item.title} description={item.description}
                       onClick={onExamplesCard}></DefaultBlogCard>
    );
  });

  useEffect(() => {

    restget("/api/dashboard")
      .then((response) => {
        console.log(response);
        if (response.hasOwnProperty("error")) {
          window.location.href = "/error";
        } else {
          setCardsData(response["dashboard_data"]);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/error";
      });
  }, []);




  const compare_models = {
    "gpt4": "GPT4",
    "gpt3": "GPT3",
    "llama13b": "Llama13b",
    "llama70b": "Llama70b",
    "presidio": "Presidio",
    "claude": "Claude",
    "mixtral": "Mixtral",
  };

  let compare_model1 = (
    <Select
    labelId="source-label"
    id="source"
    value="purple"
    disabled
    label="Purple Model"
  >
      <MenuItem value={"purple"}>Purple Model</MenuItem>
  </Select>);

  let compare_model2 = (
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
    </Select>);

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
      <DashboardNavbar notifCount={cardsData["feedbacks_count"]} />
      {settingsDialogItem}
          <Grid container spacing={3} padding={0}>
            <Grid item xs={10} xl={10} md={10} >
              <Grid container spacing={3}>
              </Grid>
            </Grid>
            <Grid item xs={6} xl={8} md={8} lg={8}>
              <SoftInput placeholder="Type here..." value={prompt} multiline rows={3} onChange={(event) => {
                setPrompt(event.target.value);
              }} />
            </Grid>
            <Grid item xs={1} xl={1} md={1} lg={1} justifyItems={"flex-end"} >
              <SoftButton color="primary" onClick={runQuery}><Icon
                sx={{ fontWeight: "bold" }}>send</Icon>&nbsp;&nbsp;Run</SoftButton>
            </Grid>
            <Grid item xs={1} xl={1} md={1} lg={1} align="left">
              <Tooltip key={"clearchat"} title={"Settings"} placement="top">
                <SoftButton iconOnly display="flex" position="baseline" variant={"contained"}  onClick={handleClickOpen}><Icon>settings</Icon></SoftButton>
              </Tooltip>
            </Grid>
            <Grid item xs={10} >
              <Grid container  gap={2} spacing={3} padding={2} marginRight={2}>
                {example_cards}
              </Grid>
            </Grid>
            <Grid item xs={5} sm={5}>
              <SoftBox sx={{ height: '100%' }} >
                <TimelineList title="Safety Model" selectControl={compare_model1} >
                  {timeline1}
                </TimelineList>
              </SoftBox>
            </Grid>
            <Grid item xs={5}  sm={5} >
              <SoftBox sx={{ height: '100%' }}>
                <TimelineList title="Safety Model" selectControl={compare_model2} >
                  {timeline2}
                </TimelineList>
              </SoftBox>
            </Grid>
            <Grid item xs={10} align="right">
              <Tooltip key={"clearchat"} title={"Clear chat"} placement="top">
              <SoftButton onClick={clearContents}>Clear All</SoftButton>
              </Tooltip>

            </Grid>
          </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Playground;
