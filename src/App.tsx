import { useDispatch, useSelector } from 'react-redux'
import { Folder } from './components/Folder'
import { File } from './components/File'
import { Navbar } from './components/Navbar'
import { AppDispatch, RootState } from "@/state/store"
import { useEffect } from 'react';
import { folderService } from './api/folder-service';
import { setItems } from './state/items-slice';

function App() {

  const items = useSelector((state: RootState) => state.items);
  const folderStack = useSelector((state: RootState) => state.folderStack);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(!folderStack.selected) {
      fetchFirst();
      return
    } ;

    fetchFolderDirectDescendants(folderStack.selected._id);
  }, [folderStack])

  async function fetchFirst() {
    const firstFolders = await folderService.findFirst();
    dispatch(setItems(firstFolders))
  }

  async function fetchFolderDirectDescendants(id: string) {
    const descendantFolders = await folderService.findFolderDirectDescendants(id);
    dispatch(setItems(descendantFolders));
  }

  return (
    <div>
      <Navbar/>
      <div className='flex flex-wrap p-10'>
        {
          items.map(
            (item, idx) =>  item.type === "folder" ? 
            <Folder key={idx} folder={item}/> : <File key={idx} file={item}/>
          )
        }
      </div>
    </div>
  )
}

export default App
