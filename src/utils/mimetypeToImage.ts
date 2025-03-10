import { MimeType } from "@/@types/Mimetype";
import imageImage from "@/assets/images/image.png";
import pdfImage from "@/assets/images/pdf.png";
import txtImage from "@/assets/images/text.png";
import blankImage from "@/assets/images/blank.png";
 
export const mimetypeToImage: Record<MimeType, string> = {
  "application/json": blankImage,
  "application/xml": blankImage,
  "application/pdf": pdfImage,
  "application/javascript": blankImage,
  "application/octet-stream": blankImage,
  "application/zip": blankImage,
  "application/x-www-form-urlencoded": txtImage,
  "application/sql": blankImage,
  "application/graphql": blankImage,
  "application/ld+json": blankImage,
  "image/jpeg": imageImage,
  "image/png": imageImage,
  "image/gif": blankImage,
  "image/webp": imageImage,
  "image/svg+xml": imageImage,
  "text/plain": txtImage,
  "text/html": blankImage,
  "text/css": blankImage,
  "text/csv": blankImage,
  "text/javascript": blankImage,
  "text/xml": blankImage,
  "audio/mpeg": blankImage,
  "audio/ogg": blankImage,
  "audio/wav": blankImage,
  "video/mp4": blankImage,
  "video/webm": blankImage,
  "video/ogg": blankImage,
  "font/woff": blankImage,
  "font/woff2": blankImage,
  "font/ttf": blankImage,
  "font/otf": blankImage,
  "multipart/form-data": blankImage,
}