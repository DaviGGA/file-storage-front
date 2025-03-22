

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IFolder } from "@/@types/IFolder"
import { Document } from "@/@types/Document"
import { StateSet } from "@/@types/SetState"

type Props = {
  folder: Document<IFolder>,
  open: boolean,
  setOpen: StateSet<boolean> 
}

export function FolderProperties({folder, open, setOpen}: Props) {

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propriedades de {folder.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <p><span className="font-bold">Tipo:</span> Pasta de arquivos</p>
            <p><span className="font-bold">Tamanho:</span> 2MB</p>
            <p><span className="font-bold">Contem:</span> 10 arquivos, 3 pastas</p>
            <p><span className="font-bold">Criado em:</span> Segunda-feira, 10 de março de 2025, 13:36</p>
            <p><span className="font-bold">Caminho:</span> {folder.path}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
  
}
