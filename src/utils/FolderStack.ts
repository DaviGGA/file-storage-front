import { IFolder } from "@/@types/IFolder";
import { Document } from "@/@types/Document";

type FolderList = Document<IFolder>[];;

export type FolderStack = {
  backStack: FolderList,
  forwardStack: FolderList,
  selected: Document<IFolder> | null
}

const navigate = (
  stack: FolderStack, 
  folder: Document<IFolder>
): FolderStack => ({
    backStack: stack.selected ? 
      [...stack.backStack,  stack.selected] : stack.backStack,
    forwardStack: [],
    selected: folder
})
  
const goBack = (stack: FolderStack): FolderStack => {
  const [newBackStack, poppedFolder] = pop(stack.backStack);

  return {
    backStack: newBackStack,
    forwardStack: [
      ...stack.forwardStack, 
      stack.selected as Document<IFolder>
    ],
    selected: stack.backStack.length > 0 ?
      poppedFolder : null
  }
}

const goForward = (stack: FolderStack): FolderStack => {
  const [newForwardStack, poppedFolder] = pop(stack.forwardStack);

  return {
    backStack: [
      ...stack.backStack, 
      stack.selected as Document<IFolder>
    ],
    forwardStack: newForwardStack,
    selected: poppedFolder
  }
}

const pop = (stack: FolderList): [FolderList, Document<IFolder> | null] => {
  const clone = stack.concat();
  const excludedFolder = clone.pop() ?? null;
  return [clone, excludedFolder]
}

export const folderStackNavigation = {
  navigate,
  goBack,
  goForward
}
