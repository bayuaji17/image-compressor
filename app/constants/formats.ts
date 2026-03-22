import type {
  CompressOptions,
  OutputFormatOption,
  SupportedFormat,
} from "../types";

export const SUPPORTED_INPUT_TYPES: SupportedFormat[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const OUTPUT_FORMATS: OutputFormatOption[] = [
  { label: "JPEG", mime: "image/jpeg", extension: "jpg" },
  { label: "PNG", mime: "image/png", extension: "png" },
  { label: "WebP", mime: "image/webp", extension: "webp" },
];

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILES = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const DEFAULT_OUTPUT_FORMAT: SupportedFormat = "image/webp";

export const DEFAULT_COMPRESS_OPTIONS: CompressOptions = {
  maxSizeMB: 1,
  quality: 0.8,
  useWebWorker: true,
  preserveExif: true,
};
