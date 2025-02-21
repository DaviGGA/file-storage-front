import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { ButtonHTMLAttributes, ReactNode, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/state/store"
import { folderService } from "@/api/folder-service"
import { add } from "@/state/items-slice"

type Props = {
  children: ReactNode,
  className?: string
}

export function CreateFolderDialog({children, className}: Props) {

  const selected = useSelector((state: RootState) => state.folderStack.selected);
  const dispatch = useDispatch<AppDispatch>();
  
  const [folderName, setFolderName] = useState<string>();
  const closeRef= useRef<HTMLButtonElement>(null);

  async function onCreateClick() {
    const newFolder = await folderService.createFolder(folderName!, selected?.path ?? null);
    dispatch(add(newFolder));
    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className={className}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar pasta</DialogTitle>
          <Input
          className="mt-5"
          placeholder="Nome da pasta"
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
          />
          <DialogFooter>
            <div className="mt-3 flex justify-end">
              <Button
              onClick={onCreateClick}
              disabled={!folderName}
              >
                Criar
              </Button>
            </div>
            <DialogClose>
              <Button 
              ref={closeRef}
              className="hidden"
              />
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}