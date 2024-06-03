import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListData } from "../types/list-detail";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

type ModalProp = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectList: string;
  setSelectList: React.Dispatch<React.SetStateAction<string>>;
  listId: string;
  setListId: React.Dispatch<React.SetStateAction<string>>;
  listData: ListData[];
  handleWatchList: () => Promise<void>;
  isFetching: boolean;
};

export default function CModal({
  open,
  setOpen,
  selectList,
  setSelectList,
  listData,
  setListId,
  handleWatchList,
  isFetching,
}: ModalProp) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectList(event.target.value as string);
  };

  const handleListId = (event: SelectChangeEvent) => {
    setListId(event.target.value as string);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            border: "none",
          },
        }}
      >
        <div className="p-4 bg-[#212121]">
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "#FFFFFF" }}
              >
                Select List
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectList}
                label="Select List"
                onChange={handleChange}
                sx={{
                  color: "#FFFFFF",
                  "& fieldset": {
                    borderColor: "#FFFFFF !important",
                    borderWidth: "1.5px",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#FFFFFF",
                  },
                }}
              >
                <MenuItem value={"private"}>Private List</MenuItem>
                <MenuItem value={"public"}>Public List</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300, marginTop: "20px", marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "#FFFFFF" }}
              >
                Select
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectList}
                label="Select"
                onChange={handleListId}
                sx={{
                  color: "#FFFFFF",
                  "& fieldset": {
                    borderColor: "#FFFFFF !important",
                    borderWidth: "1.5px",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#FFFFFF",
                  },
                }}
              >
                {listData
                  ? listData.map((list) => (
                      <MenuItem key={String(list.id)} value={String(list.id)}>
                        {list.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Box>

          <div className="flex justify-end gap-5">
            <span
              className="text-main text-left cursor-pointer"
              onClick={handleWatchList}
            >
              {isFetching ? (
                <CircularProgress size={16} sx={{ color: "#FF204E" }} />
              ) : (
                "Add"
              )}
            </span>
            <span
              className="text-main text-left cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </span>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
