import { useDropFiles } from "../hooks/useDropFiles";
import { useTranslation } from "react-i18next";

export function DropZone(props: { onFiles: (files: File[]) => void }) {
  const { t } = useTranslation();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    open,
    acceptedFiles,
  } = useDropFiles(props.onFiles);

  const stateClasses = isDragReject
    ? "border-rose-400 bg-rose-50"
    : isDragActive
      ? "border-teal-500 bg-teal-50"
      : "border-slate-300 bg-slate-50";

  return (
    <section
      {...getRootProps()}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${stateClasses}`}
    >
      <input {...getInputProps()} />
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
        {t("dropzone.eyebrow")}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {t("dropzone.title")}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
        {t("dropzone.description")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            open();
          }}
          className="rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-600"
        >
          {t("dropzone.btn_choose")}
        </button>
        <span className="text-sm font-medium text-slate-500">
          {acceptedFiles.length > 0
            ? t("dropzone.ready_to_add", { count: acceptedFiles.length })
            : t("dropzone.drag_drop")}
        </span>
      </div>
    </section>
  );
}
