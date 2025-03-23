import { Bytes } from "@/@types/IFile";

const KBYTE = 1024
const MEGABYTE = KBYTE * 1024
const GIGABYTE = MEGABYTE * 1024

export function fileSizeFormat(size: Bytes) {
  if (size > GIGABYTE) return `${(size / GIGABYTE).toFixed(2)} GB` 
  if (size > MEGABYTE) return `${(size / MEGABYTE).toFixed(2)} MB`
  if (size > KBYTE) return `${(size / KBYTE).toFixed(2)} KB`
  return `${size.toFixed(2)} B`
}

