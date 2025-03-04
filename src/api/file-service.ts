import { IFile } from "@/@types/IFile";
import { Document } from "@/@types/Document";
import { api } from "./axios";

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

export const fileService = {
  createFile
}