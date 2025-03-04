import { BaseStorageItem } from "./BaseStorageItem"

type Bytes = number

export type IFile = {
  type: "file",
  size: Bytes,
  mimetype: string,

} & BaseStorageItem