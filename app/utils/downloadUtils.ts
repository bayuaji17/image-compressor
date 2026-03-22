import type { ImageFile } from "../types";
import { fileNameWithoutExtension, mimeToExt } from "./imageUtils";
import JSZip from "jszip";

function triggerDownload(file: File, nextName: string) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = nextName;
  anchor.click();

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function downloadFile(image: ImageFile) {
  if (!image.compressedFile) {
    return;
  }

  const ext = mimeToExt(image.compressedFile.type || image.file.type);
  const baseName = fileNameWithoutExtension(image.file.name);

  triggerDownload(image.compressedFile, `${baseName}_processed.${ext}`);
}

export async function downloadAllAsZip(_images: ImageFile[]) {
  const zip = new JSZip();
  const folder = zip.folder("compressed-images");

  if (!folder) {
    throw new Error("Unable to create ZIP folder.");
  }

  const completedImages = _images.filter((image) => image.compressedFile);
  if (completedImages.length === 0) {
    return;
  }

  for (const image of completedImages) {
    const file = image.compressedFile;
    if (!file) {
      continue;
    }

    const ext = mimeToExt(file.type || image.file.type);
    const baseName = fileNameWithoutExtension(image.file.name);
    folder.file(`${baseName}_processed.${ext}`, file);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(
    new File([blob], "image-tools-export.zip", {
      type: "application/zip",
    }),
    "image-tools-export.zip",
  );
}
