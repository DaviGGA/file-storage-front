import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/@types/Document";
import { StorageItem } from "@/@types/StorageItem";

type ItemsState = Document<StorageItem>[];

const initialState: ItemsState = [];

const items = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (_, action: PayloadAction<Document<StorageItem>[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Document<StorageItem>>) => {
      return [...state, action.payload]
    }
  }
})

export const { setItems, add } = items.actions;

export default items.reducer;