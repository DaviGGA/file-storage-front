import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/@types/Document";
import { IFolder } from "@/@types/IFolder";
import { FolderStack } from "@/utils/FolderStack";
import { folderStackNavigation } from "@/utils/FolderStack";

type SelectedFolderState = FolderStack

const initialState: SelectedFolderState = {
  backStack: [],
  forwardStack: [],
  selected: null
}

const folderStack = createSlice({
  name: "folderStack",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<Document<IFolder>>) => 
      folderStackNavigation.navigate(state, action.payload)
    ,
    goBack: state => folderStackNavigation.goBack(state),
    goForward: state => folderStackNavigation.goForward(state)
  }
})

export const { navigate, goBack, goForward } = folderStack.actions;

export default folderStack.reducer;