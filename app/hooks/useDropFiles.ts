import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { MAX_FILES, SUPPORTED_INPUT_TYPES } from "../constants/formats";

const accept = Object.fromEntries(
  SUPPORTED_INPUT_TYPES.map((mime) => [mime, []]),
);

export function useDropFiles(onFiles: (files: File[]) => void) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFiles(acceptedFiles);
      }
    },
    [onFiles],
  );

  return useDropzone({
    accept,
    maxFiles: MAX_FILES,
    multiple: true,
    onDropAccepted: handleDrop,
  });
}
