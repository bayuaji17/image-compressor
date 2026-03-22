import type { ImageFile } from "../types";
import { calcReduction, formatSize, mimeToExt } from "../utils/imageUtils";
import { useTranslation } from "react-i18next";

export function ImageCard(props: {
  image: ImageFile;
  processLabel: string;
  onRemove: (id: string) => void;
  onProcess: (id: string) => void;
  onDownload?: (image: ImageFile) => void;
}) {
  const { t } = useTranslation();
  const { image } = props;
  const resultPreview = image.compressedPreview ?? image.preview;
  const resultSize = image.compressedSize ?? image.originalSize;
  const reduction =
    image.compressedSize != null
      ? calcReduction(image.originalSize, image.compressedSize)
      : null;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={resultPreview}
          alt={image.file.name}
          className="h-full w-full object-cover"
        />
        {image.status === "processing" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <p className="text-sm font-semibold">
              {t("image_card.processing", { progress: Math.round(image.progress ?? 0) })}
            </p>
          </div>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-4">
            <p className="truncate text-base font-semibold text-slate-900">
              {image.file.name}
            </p>
            <p className="mt-1 truncate text-sm text-slate-500">
              {mimeToExt(image.file.type).toUpperCase()} •{" "}
              {formatSize(image.originalSize)}
              {image.compressedSize != null
                ? ` -> ${formatSize(resultSize)}`
                : ""}
            </p>
          </div>
          <StatusBadge image={image} reduction={reduction} />
        </div>

        {image.error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {image.error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => props.onProcess(image.id)}
            disabled={image.status === "processing" || Boolean(image.error)}
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {image.status === "done" ? t("common.process_again") : props.processLabel}
          </button>
          {image.status === "done" && props.onDownload ? (
            <button
              type="button"
              onClick={() => props.onDownload?.(image)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              {t("common.download")}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => props.onRemove(image.id)}
            className="ml-auto rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            {t("common.remove")}
          </button>
        </div>
      </div>
    </article>
  );
}

function StatusBadge(props: { image: ImageFile; reduction: number | null }) {
  const { t } = useTranslation();

  if (props.image.status === "done") {
    return (
      <span className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        {props.reduction != null ? `-${props.reduction}%` : t("common.done")}
      </span>
    );
  }

  if (props.image.status === "error") {
    return (
      <span className="shrink-0 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-700 ring-1 ring-inset ring-red-600/10">
        {t("common.error")}
      </span>
    );
  }

  if (props.image.status === "processing") {
    return (
      <span className="shrink-0 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700 ring-1 ring-inset ring-teal-600/20">
        {t("common.working")}
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 ring-1 ring-inset ring-slate-500/10">
      {t("common.ready")}
    </span>
  );
}
