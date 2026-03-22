import {
  MAX_FILE_SIZE_BYTES,
  SUPPORTED_INPUT_TYPES,
} from "../constants/formats";

const SIZE_UNITS = ["B", "KB", "MB", "GB"] as const;

export function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    SIZE_UNITS.length - 1,
  );
  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${SIZE_UNITS[unitIndex]}`;
}

export function calcReduction(original: number, compressed: number): number {
  if (original <= 0 || compressed < 0) {
    return 0;
  }

  const reduction = ((original - compressed) / original) * 100;

  return Number(Math.max(0, reduction).toFixed(1));
}

export function validateFile(file: File): string | null {
  if (
    !SUPPORTED_INPUT_TYPES.includes(
      file.type as (typeof SUPPORTED_INPUT_TYPES)[number],
    )
  ) {
    return "Unsupported file type. Please upload JPEG, PNG, or WebP images.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File is too large. Maximum file size is 50 MB.";
  }

  return null;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createPreview(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreview(url?: string): void {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

export function mimeToExt(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "bin";
  }
}

export function fileNameWithoutExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
}
