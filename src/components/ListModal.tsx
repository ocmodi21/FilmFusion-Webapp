import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { CircularProgress, TextField } from "@mui/material";

type ModalProp = {
  addListOpen: boolean;
  setAddListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listName: string;
  setListName: React.Dispatch<React.SetStateAction<string>>;
  isAddingList: boolean;
  handleAddList: () => Promise<void>;
};

export default function ListModal({
  addListOpen,
  setAddListOpen,
  listName,
  setListName,
  isAddingList,
  handleAddList,
}: ModalProp) {
  const handleClose = () => {
    setAddListOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={addListOpen}
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
          <TextField
            sx={{
              input: {
                color: "#FFFFFF !important",
              },
              "& fieldset": {
                borderColor: "#FFFFFF !important",
                borderWidth: "1.5px",
              },
              label: {
                color: "#ffffff",
              },
            }}
            size="small"
            label="List Name"
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />

          <div className="flex justify-end gap-5 mt-3">
            <span
              className="text-main text-left cursor-pointer"
              onClick={handleAddList}
            >
              {isAddingList ? (
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
