import { IFile } from "@/@types/IFile";
import { Document } from "@/@types/Document";
import { api } from "./axios";
import { MoveFile } from "@/@types/MoveFile";

type CreateFile = {
  name: string | null,
  path: string | null,
  file: File
}

async function createFile(params: CreateFile): Promise<Document<IFile>> {

  const formData = new FormData();

  if(params.name) {
    formData.append("name", params.name);
  }

  if(params.path) {
    formData.append("path", params.path);
  }

  formData.append("file", params.file);

  const response = await api.post<Document<IFile>>(
    "/file", 
    params, 
    {headers: {'Content-type': "multipart/form-data"}}
  );

  return response.data;

}

async function downloadFile(fileId: string): Promise<Blob> {
  const response = await api.get(`/file/download/${fileId}`, {
    responseType: "blob"
  });
  return response.data
}

async function deleteFile(id: string): Promise<Document<IFile>> {
  const response = await api.delete<Document<IFile>>(`/file/${id}`);
  return response.data;
}

async function moveFile(body: MoveFile) {
  const response = await api.post<Document<IFile>>(`/file/move`, body);
  return response.data;
}

export const fileService = {
  createFile,
  downloadFile,
  deleteFile,
  moveFile
}