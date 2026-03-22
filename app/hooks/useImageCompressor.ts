import imageCompression from "browser-image-compression";
import { useEffect, useRef, useState } from "react";

import { DEFAULT_COMPRESS_OPTIONS } from "../constants/formats";
import type { CompressOptions, ImageFile } from "../types";
import {
  createPreview,
  generateId,
  revokePreview,
  validateFile,
} from "../utils/imageUtils";

export function useImageCompressor() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [options, setOptions] = useState<CompressOptions>(
    DEFAULT_COMPRESS_OPTIONS,
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

  async function compressOne(id: string) {
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
              progress: 0,
              error: undefined,
            }
          : image,
      ),
    );

    try {
      const compressedFile = await imageCompression(target.file, {
        maxSizeMB: optionsRef.current.maxSizeMB,
        maxWidthOrHeight: optionsRef.current.maxWidthOrHeight,
        useWebWorker: optionsRef.current.useWebWorker,
        initialQuality: optionsRef.current.quality,
        exifOrientation: optionsRef.current.preserveExif ? undefined : -1,
        onProgress: (progress) => {
          setImages((current) =>
            current.map((image) =>
              image.id === id ? { ...image, progress } : image,
            ),
          );
        },
      });

      const nextFile = new File([compressedFile], target.file.name, {
        type: compressedFile.type || target.file.type,
        lastModified: Date.now(),
      });
      const nextPreview = createPreview(nextFile);

      setImages((current) =>
        current.map((image) => {
          if (image.id !== id) {
            return image;
          }

          revokePreview(image.compressedPreview);

          return {
            ...image,
            compressedFile: nextFile,
            compressedSize: nextFile.size,
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
                  error instanceof Error
                    ? error.message
                    : "Compression failed.",
              }
            : image,
        ),
      );
    }
  }

  async function compressAll() {
    for (const image of imagesRef.current) {
      if (image.status === "idle") {
        await compressOne(image.id);
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
    compressOne,
    compressAll,
    removeImage,
    clearAll,
  };
}
