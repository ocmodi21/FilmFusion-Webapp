import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";
import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CTreeView from "../components/TreeView";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

const Dashboard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentTab, setCurrentTab] = useState("Home");
  const { clearDataFromStorage } = useStorage();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "#121212" }}>
        <div className="flex flex-row items-center text-2xl text-main gap-2 font-sans">
          <MovieFilterIcon fontSize="large" />
          <span>Film Fusion</span>
        </div>
      </Toolbar>

      <List className="h-screen bg-bgcolor">
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setCurrentTab("CreateJob");
              if (!isClosing) {
                setMobileOpen(false);
              }
            }}
          >
            <span className="text-[20px] font-medium text-font">Home</span>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setCurrentTab("AllJob");
              if (!isClosing) {
                setMobileOpen(false);
              }
            }}
          >
            <CTreeView />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setCurrentTab("AllJob");
              if (!isClosing) {
                setMobileOpen(false);
              }
            }}
          >
            <CTreeView />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              clearDataFromStorage();
              navigate("/");
            }}
          >
            <span className="text-[20px] font-medium text-font">Logout</span>
          </ListItemButton>
        </ListItem>
      </List>
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
        <Toolbar sx={{ bgcolor: "#121212" }}>
          <div className="flex justify-between md:justify-end w-full">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "#FF204E" }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex items-center gap-7">
              <Box sx={{ color: "action.active" }}>
                <Badge sx={{ color: "#FF204E" }} variant="dot">
                  <NotificationsIcon sx={{ cursor: "pointer" }} />
                </Badge>
              </Box>
              <Avatar
                sizes="small"
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                sx={{
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#FF204E",
                }}
              />
            </div>
          </div>
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
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderColor: "#121212",
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
              borderColor: "#121212",
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
          backgroundColor: "#121212",
        }}
        className="h-screen"
      >
        <Toolbar sx={{ backgroundColor: "#121212" }} />
        <div className="text-font">Hello</div>
        {/* {recruiterTabStatus === "CreateJob" && <JobApplications />}
        {recruiterTabStatus === "AllJob" && (
          <AllJobs
            setRecruiterTabStatus={setRecruiterTabStatus}
            setJobId={setJobId}
          />
        )}
        {recruiterTabStatus === "View" && (
          <Responses id={jobId} setRecruiterTabStatus={setRecruiterTabStatus} />
        )} */}
      </Box>
    </Box>
  );
};

export default Dashboard;
