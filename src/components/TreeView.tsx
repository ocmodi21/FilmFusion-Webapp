import React, { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { ListData } from "../types/list-detail";

type TreeViewProp = {
  title: string;
  listData: ListData[];
  addListOpen: boolean;
  setAddListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CTreeView({
  title,
  listData,
  setAddListOpen,
}: TreeViewProp) {
  return (
    <SimpleTreeView>
      <TreeItem
        itemId="grid"
        label={title}
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
        {listData
          ? listData.map((list) => (
              <div key={String(list.id)} className="mb-2">
                <TreeItem itemId={String(list.id)} label={list.name} />
              </div>
            ))
          : null}
        <TreeItem
          className="text-main"
          itemId={"add"}
          label={"+ New List"}
          onClick={() => setAddListOpen(true)}
        />
      </TreeItem>
    </SimpleTreeView>
  );
}
