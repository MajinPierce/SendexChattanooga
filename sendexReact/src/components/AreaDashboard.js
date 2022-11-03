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

const drawerWidth = 240;

function AreaDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openTN, setOpenTN] = React.useState(false);
  const [openAL, setOpenAL] = React.useState(false);

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

  const handleAreaClick = (apiName) => {
    console.log(apiName);
  };

  const climbingAreas = [
    { areaName: "Leda", state: "TN", apiName: "Leda" },
    { areaName: "Foster Falls", state: "TN", apiName: "Fosters" },
    { areaName: "Tennessee Wall", state: "TN", apiName: "Twall" },
    { areaName: "Sunset Rock", state: "TN", apiName: "Sunset" },
    { areaName: "Sandrock", state: "AL", apiName: "Sandrock" },
    { areaName: "Obed", state: "TN", apiName: "Obed" },
    { areaName: "Woodcock Cove", state: "TN", apiName: "Woodcock" },
    { areaName: "King's Bluff", state: "TN", apiName: "KingsBluff" },
    { areaName: "Horse Pens 40", state: "AL", apiName: "HorsePens" },
  ];

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
                <ListItemButton onClick={() => handleAreaClick(area.apiName)}>
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
                <ListItemButton onClick={() => handleAreaClick(area.apiName)}>
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
            Sendex
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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </Box>
    </Box>
  );
}

export default AreaDashboard;
