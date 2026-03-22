import type { ImageFile } from "../types";
import { useTranslation } from "react-i18next";

export function ProgressBar(props: { images: ImageFile[] }) {
  const { t } = useTranslation();
  const total = props.images.length;
  if (total === 0) {
    return null;
  }

  const done = props.images.filter((image) => image.status === "done").length;
  const pct = Math.round((done / total) * 100);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            {t("progress.title")}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {t("progress.complete", { done, total })}
          </p>
        </div>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {pct}%
        </p>
      </div>
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
