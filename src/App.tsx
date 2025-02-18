import { Folder } from './components/Folder'
import { Navbar } from './components/Navbar'
import { useFile } from './providers/FileProvider'

function App() {

  const { items } = useFile();

  return (
    <div>
      <Navbar/>
      <div className='flex flex-wrap p-10'>
        {items.map(item =>  item.type === "folder" ? <Folder folder={item}/> : <></>)}
      </div>
    </div>
  )
}

export default App
