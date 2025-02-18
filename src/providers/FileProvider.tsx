import { StorageItem } from "@/@types/StorageItem";
import { folderService } from "@/api/folder-service";
import { ReactNode, useContext, useEffect, useState } from "react"
import { createContext } from 'react';
import { Document } from "@/@types/Document";

type Props = {
  children: ReactNode
}

type Context = {
  path: string,
  items: Document<StorageItem>[],
  openFolder: string | null,
  setPath: React.Dispatch<React.SetStateAction<string>>,
  setItems: React.Dispatch<React.SetStateAction<Document<StorageItem>[]>>,
  setOpenFolder: React.Dispatch<React.SetStateAction<string | null>>
}

const FileContext = createContext({} as Context);

export const FileProvider = ({children}: Props) => {
  const [path, setPath] = useState<string>("user/");
  const [items, setItems] = useState<Document<StorageItem>[]>([]);
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  useEffect(() => {
    onPathChange()
  }, [path])

  async function onPathChange() {
    if (!openFolder) {
      const items = await folderService.findFirst();
      setItems(items);
      return;
    }

    const items = await folderService.findFolderDirectDescendants(openFolder);
    setItems(items);
  }

  return (
    <FileContext.Provider value={{path, setPath, items, setItems, openFolder, setOpenFolder}}>
      { children }
    </FileContext.Provider>
  )
}

export const useFile = () => useContext(FileContext);