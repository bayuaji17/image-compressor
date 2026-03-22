import type { CompressOptions } from "../types";

const resizeOptions = [
  { label: "No resize", value: "none" },
  { label: "3840 px", value: "3840" },
  { label: "1920 px", value: "1920" },
  { label: "1280 px", value: "1280" },
  { label: "800 px", value: "800" },
  { label: "480 px", value: "480" },
];

export function CompressSettings(props: {
  options: CompressOptions;
  onChange: (options: CompressOptions) => void;
}) {
  const { options, onChange } = props;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            Compression Settings
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Tune size, quality, and dimensions.
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-700">
            Max output size: {options.maxSizeMB.toFixed(1)} MB
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
            Quality: {Math.round(options.quality * 100)}%
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

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-700">
            Resize max dimension
          </span>
          <select
            value={options.maxWidthOrHeight ?? "none"}
            onChange={(event) =>
              onChange({
                ...options,
                maxWidthOrHeight:
                  event.target.value === "none"
                    ? undefined
                    : Number(event.target.value),
              })
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {resizeOptions.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
          <input
            type="checkbox"
            checked={options.preserveExif}
            onChange={(event) =>
              onChange({
                ...options,
                preserveExif: event.target.checked,
              })
            }
            className="h-4 w-4 rounded border-slate-300 text-teal-600 accent-teal-600 focus:ring-teal-600"
          />
          <span className="text-sm font-medium text-slate-700">
            Preserve EXIF metadata
          </span>
        </label>
      </div>
    </section>
  );
}
