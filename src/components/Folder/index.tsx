import { IFolder } from "@/@types/IFolder";
import folderImg from "@/assets/images/folder.svg";
import { Document } from "@/@types/Document";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { navigate } from "@/state/folder-stack-slice";

type Props = {
  folder: Document<IFolder>
}

export function Folder({folder}: Props) {

  const dispatch = useDispatch<AppDispatch>();

  return(
    <div
      onClick={() => dispatch(navigate(folder))}
      className="cursor-pointer hover:bg-gray-100 px-8 py-2"
    >
      <img className='w-24 h-24' src={folderImg}/>
      <p className="text-center">{folder.name}</p>
    </div>
  )
}