import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { toast } from "react-toastify";

import MovieDetailCard from "../components/MovieDetailCard";
import useStorage from "../hooks/useStorage";
import { MovieDataJson } from "../MovieData";
import CModal from "../components/Modal";
import useFetch from "../hooks/useFetch";
import { ListData } from "../types/list-detail";
import ListModal from "../components/ListModal";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

const Dashboard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [movieData, setMovieData] = useState(MovieDataJson);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectList, setSelectList] = useState("");
  const [listId, setListId] = useState("");
  const [selectMovie, setSelectMovie] = useState({
    id: "",
    title: "",
    poster_url: "",
  });
  const [addListOpen, setAddListOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = React.useState("");
  const [isAddingtoPublic, setIsAddingtoPublic] = useState(false);

  const [privateListData, setPrivatelistData] = useState<ListData[]>([]);
  const [publicListData, setPubliclistData] = useState<ListData[]>([]);

  const { httpGet, httpPost } = useFetch();
  const { getDataFromStorage, clearDataFromStorage } = useStorage();
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

  const handleWatchList = async () => {
    if (!selectMovie.id || !listId) {
      toast.warn("All fields are mandatory.");
      return;
    }

    if (selectMovie.id && listId) {
      setIsFetching(true);
      const token = await getDataFromStorage("userToken");

      const movieRes = await httpPost("movie/createMovie", selectMovie, token);

      if (movieRes.isError) {
        setIsFetching(false);
        setOpen(false);
        toast.error("Something went wrong!!");
        return;
      } else {
        const idData = {
          movieId: selectMovie.id,
          listId: parseInt(listId),
        };

        const res = await httpPost("list/addMovieToList", idData, token);

        if (res.isError) {
          setIsFetching(false);
          setOpen(false);
          toast.error(`${res.data}`);
          return;
        } else if (res.data) {
          setIsFetching(false);
          setOpen(false);
          toast.success("Movie added to list successfully!!");
          return;
        }
      }
    }
  };

  const fetchList = async () => {
    const token = await getDataFromStorage("userToken");

    const [privateListResponse, publicListResponse] = await Promise.all([
      httpGet(`list/privateLists`, token),
      httpGet(`list/publicLists`, token),
    ]);

    if (privateListResponse.isError || publicListResponse.isError) {
      toast.error(`${privateListResponse.data} || ${publicListResponse.data}`);
      return;
    } else {
      setPrivatelistData(privateListResponse.data.privateLists);
      setPubliclistData(publicListResponse.data.publicLists);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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

  const handlePrivateAddList = async () => {
    const token = await getDataFromStorage("userToken");

    setIsAddingList(true);
    const res = await httpPost(
      "list/createPrivateList",
      { name: listName },
      token
    );

    if (res.isError) {
      setIsAddingList(false);
      toast.error(`${res.data}`);
      return;
    } else if (res) {
      fetchList();
      setIsAddingList(false);
      toast.success("List Created successfully!!");
      setAddListOpen(false);
    }
  };

  const handlePublicAddList = async () => {
    const token = await getDataFromStorage("userToken");

    setIsAddingList(true);
    const res = await httpPost(
      "list/createPublicList",
      { name: listName },
      token
    );

    if (res.isError) {
      setIsAddingList(false);
      toast.error(`${res.data}`);
      return;
    } else if (res) {
      fetchList();
      setIsAddingList(false);
      toast.success("List Created successfully!!");
      setAddListOpen(false);
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
              if (!isClosing) {
                setMobileOpen(false);
              }
            }}
          >
            <SimpleTreeView>
              <TreeItem
                itemId="grid1"
                label="Private List"
                sx={{
                  color: "#ffffff",
                  "& .MuiTreeItem-content": {
                    padding: "0",
                  },
                  "& .MuiTreeItem-content.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiTreeItem-label": {
                    fontSize: "18px !important",
                  },
                }}
              >
                {privateListData
                  ? privateListData.map((list) => (
                      <TreeItem
                        key={String(list.id)}
                        itemId={String(list.id)}
                        label={list.name}
                      />
                    ))
                  : null}
                <TreeItem
                  className="text-main"
                  itemId={"Add private list"}
                  label={"+ New List"}
                  onClick={() => {
                    setAddListOpen(true);
                    setIsAddingtoPublic(false);
                  }}
                />
              </TreeItem>
            </SimpleTreeView>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (!isClosing) {
                setMobileOpen(false);
              }
            }}
          >
            <SimpleTreeView>
              <TreeItem
                itemId="grid1"
                label="Public List"
                sx={{
                  color: "#ffffff",
                  "& .MuiTreeItem-content": {
                    padding: "0",
                  },
                  "& .MuiTreeItem-content.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiTreeItem-label": {
                    fontSize: "18px !important",
                  },
                }}
              >
                {publicListData
                  ? publicListData.map((list) => (
                      <TreeItem
                        key={String(list.id)}
                        itemId={String(list.id)}
                        label={list.name}
                      />
                    ))
                  : null}
                <TreeItem
                  className="text-main"
                  itemId={"Add private list"}
                  label={"+ New List"}
                  onClick={() => {
                    setAddListOpen(true);
                    setIsAddingtoPublic(true);
                  }}
                />
              </TreeItem>
            </SimpleTreeView>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {movieData
            ? movieData.map((item: any) => (
                <div key={item.imdbID}>
                  <MovieDetailCard
                    id={item.imdbID}
                    title={item.Title}
                    poster_url={item.Poster}
                    open={open}
                    setOpen={setOpen}
                    selectMovie={selectMovie}
                    setSelectMovie={setSelectMovie}
                    listData={
                      selectList === "private"
                        ? privateListData
                        : publicListData
                    }
                  />
                </div>
              ))
            : null}
        </div>

        <CModal
          open={open}
          setOpen={setOpen}
          selectList={selectList}
          setSelectList={setSelectList}
          listData={selectList === "private" ? privateListData : publicListData}
          listId={listId}
          setListId={setListId}
          handleWatchList={handleWatchList}
          isFetching={isFetching}
        />

        <ListModal
          addListOpen={addListOpen}
          setAddListOpen={setAddListOpen}
          listName={listName}
          setListName={setListName}
          isAddingList={isAddingList}
          handleAddList={
            isAddingtoPublic ? handlePublicAddList : handlePrivateAddList
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
