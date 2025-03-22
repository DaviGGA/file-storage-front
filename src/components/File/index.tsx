import { IFile } from "@/@types/IFile"
import { Document } from "@/@types/Document";
import imageImage from "@/assets/images/image.png"
import { fileService } from "@/api/file-service";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { mimetypeToExtension } from "@/utils/mimetypeToExtension";
import { mimetypeToImage } from "@/utils/mimetypeToImage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { remove } from "@/state/items-slice";

type Props = {
  file: Document<IFile>
}

export function File({file}: Props) {

  const dispatch = useDispatch<AppDispatch>();

  async function onClickDownloadFile(file: Document<IFile>) {
    const downloadedFile = await fileService.downloadFile(file.file_id);
    
    const downloadUrl = window.URL.createObjectURL(downloadedFile);

    const link = document.createElement("a");
    link.href = downloadUrl
    link.setAttribute(
      "download",
      file.name + mimetypeToExtension[file.mimetype]
    );
    
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(downloadUrl);
  }

  async function onClickDeleteFile(file: Document<IFile>) {
    await fileService.deleteFile(file._id);
    dispatch(remove(file._id));
  }

  return(
    <ContextMenu>
      <ContextMenuTrigger>
        <div
        draggable={true} 
        className="cursor-pointer hover:bg-gray-100 px-8 py-2"
        onDragStart={(e) => e.dataTransfer.setData("fileId", file._id)}>
          <img className='w-24 h-24' src={mimetypeToImage[file.mimetype]}/>
          <p className="text-center">{file.name}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => onClickDownloadFile(file)} inset>
          Baixar arquivo
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onClickDeleteFile(file)} inset>
          Deletar arquivo
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}