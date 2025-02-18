import { useFile } from "@/providers/FileProvider";
import { BackAndForward } from "./BackAndForward";

export function Navbar() {

  const fileContext = useFile();

  return (
    <div className="w-full px-5 py-2 border-b-2 flex justify-between">
      <BackAndForward/>
      <div className="py-2">{fileContext.path}</div>
      <div></div>
    </div>
  )
}

