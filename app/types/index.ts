export type ImageStatus = "idle" | "processing" | "done" | "error";

export type SupportedFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  compressedFile?: File;
  compressedSize?: number;
  compressedPreview?: string;
  status: ImageStatus;
  progress?: number;
  error?: string;
}

export interface CompressOptions {
  maxSizeMB: number;
  maxWidthOrHeight?: number;
  quality: number;
  useWebWorker: boolean;
  preserveExif: boolean;
}

export interface ConvertOptions {
  targetFormat: SupportedFormat;
  quality: number;
}

export interface OutputFormatOption {
  label: string;
  mime: SupportedFormat;
  extension: string;
}
