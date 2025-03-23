import { IFolder } from "@/@types/IFolder";
import folderImg from "@/assets/images/folder.svg";
import { Document } from "@/@types/Document";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { navigate } from "@/state/folder-stack-slice";
import { fileService } from "@/api/file-service";
import { remove } from "@/state/items-slice";
import { folderService } from "@/api/folder-service";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { FolderPropertiesDialog } from "./FolderPropertiesDialog";
import { useState } from "react";

type Props = {
  folder: Document<IFolder>
}

export function Folder({folder}: Props) {

  const dispatch = useDispatch<AppDispatch>();

  const [propertiesOpen, setPropertiesOpen] = useState(false);

  async function onDropMoveFile(fileId: string, folder: Document<IFolder>) {
    await fileService.moveFile({fileId, folderId: folder._id});
    dispatch(remove(fileId));
  }

  async function onDropMoveFolder(receivingId: string, movingId: string) {
    await folderService.moveFolder({receivingId, movingId})
    dispatch(remove(movingId));
  }

  async function onClickDeleteFolder(folder: Document<IFolder>) {
    await folderService.deleteFolder(folder._id);
    dispatch(remove(folder._id));
  }

  return(
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
          onClick={() => dispatch(navigate(folder))}
          draggable={true}
          onDragStart={(e) => e.dataTransfer.setData("folderId", folder._id)}
          onDrop={e => {
            e.preventDefault();
            const fileId: string | null = e.dataTransfer.getData("fileId");
            const folderId: string | null = e.dataTransfer.getData("folderId");

            if(fileId) onDropMoveFile(fileId, folder);
            if(folderId) onDropMoveFolder(folder._id, folderId)
          }}
          onDragOver={e => e.preventDefault()}
          className="cursor-pointer hover:bg-gray-100 px-8 py-2"
          >
            <img className='w-24 h-24' src={folderImg}/>
            <p className="text-center">{folder.name}</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem onClick={() => onClickDeleteFolder(folder)} inset>
            Deletar pasta
          </ContextMenuItem>
          <ContextMenuItem onClick={() => setPropertiesOpen(true)} inset>
            Propriedades
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <FolderPropertiesDialog
      folder={folder}
      open={propertiesOpen}
      setOpen={setPropertiesOpen}
      />
    </>
  )
}