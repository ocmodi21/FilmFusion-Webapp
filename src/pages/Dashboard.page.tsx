import React, { Fragment, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Drawer } from "@mui/material";
import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CTreeView from "../components/TreeView";
import MovieDetailCard from "../components/MovieDetailCard";
import { MovieDetail } from "../types/movie-detail";
import axios from "axios";
import { MovieDataJson } from "../MovieData";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

const Dashboard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentTab, setCurrentTab] = useState("Home");
  const [movieData, setMovieData] = useState(MovieDataJson);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  useEffect(() => {
    const getData = setTimeout(() => {
      const text = searchText.replace(/\s/g, "+");
      setIsLoading(true);
      axios
        .get(
          `https://www.omdbapi.com/?s=${text}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        )
        .then((response) => {
          if (response.data.Search) {
            setMovieData(response.data.Search);
          }
        });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(getData);
  }, [searchText]);

  useEffect(() => {
    if (!searchText || searchText === "") {
      setMovieData(MovieDataJson);
    }
  }, [searchText]);

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
            <span className="text-lg font-medium text-font">Home</span>
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
            <span className="text-lg font-medium text-font">Logout</span>
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
            <div className="flex items-center gap-4">
              <input
                className="w-full text-sm md:text-md bg-bgcolor px-3 py-2 font-bold text-font !outline-none rounded-lg border-[1px] border-main"
                placeholder="Search"
                type="test"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
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
        className={!movieData ? "h-screen" : "h-full"}
      >
        <Toolbar sx={{ backgroundColor: "#121212" }} />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="text-font">Loading...</span>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {movieData
            ? movieData.map((item: any) => (
                <Fragment key={item.imdbID}>
                  <MovieDetailCard
                    title={item.Title}
                    poster_url={item.Poster}
                  />
                </Fragment>
              ))
            : null}
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
