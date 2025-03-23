import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IFile } from "@/@types/IFile"
import { Document } from "@/@types/Document"
import { StateSet } from "@/@types/SetState"
import { fileSizeFormat } from "@/utils/file-size-format"
import { formatDate } from "@/utils/format-date"

type Props = {
  file: Document<IFile>,
  open: boolean,
  setOpen: StateSet<boolean> 
}

export function FilePropertiesDialog({file, open, setOpen}: Props) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propriedades de {file.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <p><span className="font-bold">Tipo:</span> {file.mimetype}</p>
            <p><span className="font-bold">Tamanho:</span> {fileSizeFormat(file.size)}</p>
            <p><span className="font-bold">Criado em:</span> {formatDate(new Date(file.createdAt))}</p>
            <p><span className="font-bold">Caminho:</span> {file.path}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
