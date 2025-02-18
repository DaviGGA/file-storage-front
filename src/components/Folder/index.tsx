import { IFolder } from "@/@types/IFolder";
import folderImg from "@/assets/images/folder.svg";
import { useFile } from "@/providers/FileProvider";
import { Document } from "@/@types/Document";

type Props = {
  folder: Document<IFolder>
}

export function Folder({folder}: Props) {

  const {setOpenFolder, setPath} = useFile();

  function toChildFolder(folderId: string, path: string) {
    setOpenFolder(folderId);
    setPath(path);
  }

  return(
    <div
      onClick={() => toChildFolder(folder._id, folder.path)}
      className="cursor-pointer hover:bg-gray-100 px-8 py-2"
    >
      <img className='w-24 h-24' src={folderImg}/>
      <p className="text-center">{folder.name}</p>
    </div>
  )
}