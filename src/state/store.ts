import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./items-slice"
import selectedFolderReducer from "./folder-stack-slice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    folderStack: selectedFolderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;