import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog"
import { ChangeEvent, ReactNode, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {  useSelector } from "react-redux"
import { RootState } from "@/state/store"

import { fileService } from "@/api/file-service"

type Props = {
  children: ReactNode,
  className?: string
}

type UploadState = {
  file: File | null,
  name: string | null
}

export function UploadFolderDialog({children, className}: Props) {

  const selected = useSelector((state: RootState) => state.folderStack.selected);

  const closeRef= useRef<HTMLButtonElement>(null);

  const [upload, setUpload] = useState<UploadState>({
    file: null,
    name: null
  });

  async function onUploadClick() {

    const createFile = {
      name: upload.name,
      file: upload.file!,
      path: selected?.path ?? null
    }

    await fileService.createFile(createFile)
    
    closeRef.current?.click();
  }

  function onDialogCloseResetFile(isOpen: boolean) {
    if(!isOpen) return;
    setUpload({name: null, file: null})
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    setUpload({...upload, file});
  }

  return (
    <Dialog onOpenChange={onDialogCloseResetFile}>
      <DialogTrigger>
        <div className={className}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload de Arquivo</DialogTitle>
          <DialogDescription>Selecione o arquivo para upload.</DialogDescription>
        </DialogHeader>
        <Input
        className="mt-5"
        type="file"
        onChange={onFileChange}
        />
        <Input
        className="mt-5"
        placeholder="Nome do arquivo"
        value={upload.name ?? ""}
        onChange={e => setUpload({...upload, name: e.target.value})}
        />
        <DialogFooter>
          <div className="mt-3 flex justify-end">
            <Button
            onClick={onUploadClick}
            disabled={!upload.file}
            >
              Upload
            </Button>
          </div>
          <DialogClose>
            <Button 
            ref={closeRef}
            className="hidden"
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}