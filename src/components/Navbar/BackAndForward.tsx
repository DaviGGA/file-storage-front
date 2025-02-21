import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, goForward } from '@/state/folder-stack-slice';
import { FolderStack } from '@/utils/FolderStack';

const enableClass = 'hover:bg-gray-100 cursor-pointer p-2 rounded-full';
const disabledClass = 'opacity-50 p-2'

export function BackAndForward() {

  const folderStack = useSelector((state: RootState) => state.folderStack);
  const dispatch = useDispatch<AppDispatch>();

  function canGoback(folderStack: FolderStack): boolean {
    const isChildOfRoot = !!(folderStack.backStack.length == 0 && folderStack.selected)
    return isChildOfRoot || folderStack.backStack.length > 0 
  }

  function canGoForward({forwardStack}: FolderStack): boolean {
    return forwardStack.length > 0 
  }

  return (
    <div className='flex gap-5'>
      <div
        className={canGoback(folderStack) ? enableClass : disabledClass}
        onClick={() => canGoback(folderStack) ? dispatch(goBack()) : null}
      >
        <ArrowLeft/>
      </div>
      <div
        className={canGoForward(folderStack) ? enableClass : disabledClass}
        onClick={() => canGoForward(folderStack) ? dispatch(goForward()) : null}
      >
        <ArrowRight/>
      </div>
    </div>
  )
}