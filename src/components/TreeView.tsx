import * as React from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

export default function CTreeView() {
  return (
    <SimpleTreeView>
      <TreeItem
        itemId="grid"
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
            fontSize: "20px !important",
          },
        }}
      >
        <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
        <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
        <TreeItem itemId="grid-premium" label="@mui/x-data-premium" />
      </TreeItem>
    </SimpleTreeView>
  );
}
