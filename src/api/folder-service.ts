import { api } from "./axios";
import { StorageItem } from "@/@types/StorageItem";
import { Document } from "@/@types/Document";
import { IFolder } from "@/@types/IFolder";
import { MoveFolder } from "@/@types/MoveFolder";
import { FolderProperties } from "@/@types/FolderProperties";

async function findFolderDirectDescendants(id: string): Promise<Document<StorageItem>[]> {
  const response = await api.get<Document<StorageItem>[]>(`/folder/descendants/direct/${id}`);
  return response.data;
}

async function findFirst(): Promise<Document<StorageItem>[]> {
  const response = await api.get<Document<StorageItem>[]>("/folder");
  return response.data;
}

async function createFolder(name: string, path: string | null): Promise<Document<IFolder>> {
  const response = await api.post<Document<IFolder>>("/folder", {name, path});
  return response.data
}

async function deleteFolder(id: string): Promise<Document<IFolder>> {
  const response = await api.delete<Document<IFolder>>(`/folder/${id}`);
  return response.data;
}

async function getFolderProperties(id: string): Promise<FolderProperties> {
  const response = await api.get<FolderProperties>(`/folder/properties/${id}`);
  return response.data;
}

async function moveFolder(body: MoveFolder) {
  const response = await api.post<void>(`/folder/move`, body);
    return response.data;
}

export const folderService = {
  findFolderDirectDescendants,
  findFirst,
  createFolder,
  moveFolder,
  deleteFolder,
  getFolderProperties
}