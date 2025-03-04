import { useSelector } from "react-redux";
import { BackAndForward } from "./BackAndForward";
import { RootState } from "@/state/store";
import { Document } from "@/@types/Document";
import { IFolder } from "@/@types/IFolder";
import { FolderPlus, FilePlus } from "lucide-react";
import { CreateFolderDialog } from "../CreateFolderDialog";
import { UploadFolderDialog } from "../UploadFolderDialog";

export function Navbar() {

  const folderStack = useSelector((state: RootState) => state.folderStack);

  const getSelectedPath = (selected: Document<IFolder> | null) => {
    if (!selected) return "/user";
    return selected.path
  }

  return (
    <div className="w-full px-5 py-2 border-b-2 flex justify-between">
      <BackAndForward/>
      <div className="py-2">{getSelectedPath(folderStack.selected)}</div>
      <div className="flex gap-3">
        <CreateFolderDialog className="opacity-60 p-2 rounded-full cursor-pointer hover:bg-gray-100">
          <FolderPlus/>
        </CreateFolderDialog>
        <UploadFolderDialog className="opacity-60 p-2 rounded-full cursor-pointer hover:bg-gray-100">
          <FilePlus/>
        </UploadFolderDialog>
      </div>
    </div>
  )
}

