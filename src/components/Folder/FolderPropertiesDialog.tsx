import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IFolder } from "@/@types/IFolder"
import { Document } from "@/@types/Document"
import { StateSet } from "@/@types/SetState"
import { folderService } from "@/api/folder-service"
import { useEffect, useState } from "react"
import { FolderProperties } from "@/@types/FolderProperties"
import { fileSizeFormat } from "@/utils/file-size-format"
import { formatDate } from "@/utils/format-date"

type Props = {
  folder: Document<IFolder>,
  open: boolean,
  setOpen: StateSet<boolean> 
}

export function FolderPropertiesDialog({folder, open, setOpen}: Props) {

  const [properties, setProperties] = useState<FolderProperties>({
    fileCount: 0,
    folderCount: 0,
    totalSize: 0
  })

  useEffect(() => {
    (async () => {
      const properties = await folderService.getFolderProperties(folder._id);
      setProperties(properties)
    })() 
  }, [])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propriedades de {folder.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <p><span className="font-bold">Tipo:</span> Pasta de arquivos</p>
            <p><span className="font-bold">Tamanho:</span> {fileSizeFormat(properties.totalSize)}</p>
            <p><span className="font-bold">Contem:</span> {properties.fileCount} arquivos, {properties.folderCount} pastas</p>
            <p><span className="font-bold">Criado em:</span> {formatDate(new Date(folder.createdAt))}</p>
            <p><span className="font-bold">Caminho:</span> {folder.path}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
  
}
