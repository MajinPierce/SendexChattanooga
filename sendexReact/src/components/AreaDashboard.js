import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import axios from "axios";

import DashboardContent from "./DashboardContent";
import { climbingAreas } from "../config/areaConfigData";

const drawerWidth = 240;

function AreaDashboard(props) {
  const { window } = props;
  const baseURL = "http://192.168.50.143:8080/api/";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openTN, setOpenTN] = React.useState(false);
  const [openAL, setOpenAL] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState({});
  const [currentArea, setCurrentArea] = React.useState("");

  React.useEffect(() => {
    axios.get(baseURL + "Leda").then((response) => {
      setApiResponse(response.data);
      setCurrentArea("Leda");
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStateClick = (stateName) => {
    switch (stateName) {
      case "TN":
        setOpenTN(!openTN);
        break;
      case "AL":
        setOpenAL(!openAL);
        break;
      default:
        break;
    }
  };

  const handleAreaClick = (areaName, apiName) => {
    axios.get(baseURL + apiName).then((response) => {
      setApiResponse(response.data);
      setCurrentArea(areaName);
    });
    console.log(areaName);
  };

  const drawer = (
    <div>
      <List>
        <ListItemButton onClick={() => handleStateClick("TN")}>
          <ListItemText primary="Tennessee" />
          {openTN ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTN} timeout="auto" unmountOnExit>
          {climbingAreas
            .filter((area) => area.state === "TN")
            .map((area) => (
              <ListItem key={area.areaName} disablePadding>
                <ListItemButton
                  onClick={() => handleAreaClick(area.areaName, area.apiName)}
                >
                  <ListItemText primary={area.areaName} />
                </ListItemButton>
              </ListItem>
            ))}
        </Collapse>
        <ListItemButton onClick={() => handleStateClick("AL")}>
          <ListItemText primary="Alabama" />
          {openAL ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAL} timeout="auto" unmountOnExit>
          {climbingAreas
            .filter((area) => area.state === "AL")
            .map((area) => (
              <ListItem key={area.areaName} disablePadding>
                <ListItemButton
                  onClick={() => handleAreaClick(area.areaName, area.apiName)}
                >
                  <ListItemText primary={area.areaName} />
                </ListItemButton>
              </ListItem>
            ))}
        </Collapse>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Friction Report
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <DashboardContent name={currentArea} apiResponse={apiResponse} />
      </Box>
    </Box>
  );
}

export default AreaDashboard;
