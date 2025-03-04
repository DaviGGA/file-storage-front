import { IFile } from "@/@types/IFile"
import { Document } from "@/@types/Document";
import imageImage from "@/assets/images/image.png"

type Props = {
  file: Document<IFile>
}

export function File({file}: Props) {
  return(
    <div className="cursor-pointer hover:bg-gray-100 px-8 py-2">
      <img className='w-24 h-24' src={imageImage}/>
      <p className="text-center">{file.name}</p>
    </div>
  )
}