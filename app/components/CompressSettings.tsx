import type { CompressOptions } from "../types";
import { useTranslation } from "react-i18next";

export function CompressSettings(props: {
  options: CompressOptions;
  onChange: (options: CompressOptions) => void;
}) {
  const { options, onChange } = props;
  const { t } = useTranslation();

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            {t("compress.settings_title")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {t("compress.settings_desc")}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-700">
            {t("compress.max_size")}: {options.maxSizeMB.toFixed(1)} MB
          </span>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={options.maxSizeMB}
            onChange={(event) =>
              onChange({
                ...options,
                maxSizeMB: Number(event.target.value),
              })
            }
            className="w-full accent-teal-500"
          />
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-700">
            {t("common.quality")}: {Math.round(options.quality * 100)}%
          </span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={options.quality}
            onChange={(event) =>
              onChange({
                ...options,
                quality: Number(event.target.value),
              })
            }
            className="w-full accent-teal-500"
          />
        </label>
      </div>
    </section>
  );
}
