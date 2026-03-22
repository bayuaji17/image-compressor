import { useEffect, useRef, useState } from "react";

import { DEFAULT_OUTPUT_FORMAT } from "../constants/formats";
import type { ConvertOptions, ImageFile } from "../types";
import {
  createPreview,
  fileNameWithoutExtension,
  generateId,
  mimeToExt,
  revokePreview,
  validateFile,
} from "../utils/imageUtils";

const DEFAULT_CONVERT_OPTIONS: ConvertOptions = {
  targetFormat: DEFAULT_OUTPUT_FORMAT,
  quality: 0.86,
};

export function useImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [options, setOptions] = useState<ConvertOptions>(
    DEFAULT_CONVERT_OPTIONS,
  );
  const imagesRef = useRef(images);
  const optionsRef = useRef(options);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    return () => {
      for (const image of imagesRef.current) {
        revokePreview(image.preview);
        revokePreview(image.compressedPreview);
      }
    };
  }, []);

  function addFiles(files: File[]) {
    const nextImages = files.map<ImageFile>((file) => {
      const error = validateFile(file);

      return {
        id: generateId(),
        file,
        preview: createPreview(file),
        originalSize: file.size,
        status: error ? "error" : "idle",
        progress: 0,
        error: error ?? undefined,
      };
    });

    setImages((current) => [...current, ...nextImages]);
  }

  async function convertOne(id: string) {
    const target = imagesRef.current.find((image) => image.id === id);
    if (!target || target.status === "processing" || target.error) {
      return;
    }

    setImages((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              status: "processing",
              progress: 5,
              error: undefined,
            }
          : image,
      ),
    );

    try {
      const convertedFile = await convertViaCanvas(
        target.file,
        optionsRef.current.targetFormat,
        optionsRef.current.quality,
        (progress) => {
          setImages((current) =>
            current.map((image) =>
              image.id === id ? { ...image, progress } : image,
            ),
          );
        },
      );
      const nextPreview = createPreview(convertedFile);

      setImages((current) =>
        current.map((image) => {
          if (image.id !== id) {
            return image;
          }

          revokePreview(image.compressedPreview);

          return {
            ...image,
            compressedFile: convertedFile,
            compressedSize: convertedFile.size,
            compressedPreview: nextPreview,
            status: "done",
            progress: 100,
            error: undefined,
          };
        }),
      );
    } catch (error) {
      setImages((current) =>
        current.map((image) =>
          image.id === id
            ? {
                ...image,
                status: "error",
                progress: 0,
                error:
                  error instanceof Error ? error.message : "Conversion failed.",
              }
            : image,
        ),
      );
    }
  }

  async function convertAll() {
    for (const image of imagesRef.current) {
      if (image.status === "idle") {
        await convertOne(image.id);
      }
    }
  }

  function removeImage(id: string) {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) {
        revokePreview(target.preview);
        revokePreview(target.compressedPreview);
      }

      return current.filter((image) => image.id !== id);
    });
  }

  function clearAll() {
    setImages((current) => {
      for (const image of current) {
        revokePreview(image.preview);
        revokePreview(image.compressedPreview);
      }

      return [];
    });
  }

  return {
    images,
    options,
    setOptions,
    addFiles,
    convertOne,
    convertAll,
    removeImage,
    clearAll,
  };
}

async function convertViaCanvas(
  file: File,
  targetFormat: ConvertOptions["targetFormat"],
  quality: number,
  onProgress?: (progress: number) => void,
) {
  onProgress?.(15);

  const sourceUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(sourceUrl);
    onProgress?.(45);

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas is not available in this browser.");
    }

    if (targetFormat === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(image, 0, 0);
    onProgress?.(75);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (nextBlob) => {
          if (nextBlob) {
            resolve(nextBlob);
            return;
          }

          reject(new Error("Failed to encode the converted image."));
        },
        targetFormat,
        targetFormat === "image/png" ? undefined : quality,
      );
    });

    onProgress?.(90);

    const baseName = fileNameWithoutExtension(file.name);
    const extension = mimeToExt(targetFormat);

    return new File([blob], `${baseName}.${extension}`, {
      type: targetFormat,
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(sourceUrl);
    onProgress?.(100);
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Unable to read the selected image file."));
    image.src = src;
  });
}
