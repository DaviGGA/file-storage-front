import { BaseStorageItem } from "./BaseStorageItem"
import { MimeType } from "./Mimetype"

export type Bytes = number

export type IFile = {
  type: "file",
  size: Bytes,
  mimetype: MimeType,
  file_id: string,
} & BaseStorageItem