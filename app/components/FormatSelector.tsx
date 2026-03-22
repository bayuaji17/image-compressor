import { OUTPUT_FORMATS } from "../constants/formats";
import type { ConvertOptions } from "../types";

export function FormatSelector(props: {
  options: ConvertOptions;
  onChange: (options: ConvertOptions) => void;
}) {
  const { options, onChange } = props;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
        Output Format
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        Choose the export format and quality.
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {OUTPUT_FORMATS.map((format) => (
          <button
            key={format.mime}
            type="button"
            onClick={() =>
              onChange({
                ...options,
                targetFormat: format.mime,
              })
            }
            className={[
              "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
              options.targetFormat === format.mime
                ? "bg-teal-500 text-white shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
            ].join(" ")}
          >
            {format.label}
          </button>
        ))}
      </div>

      {options.targetFormat === "image/png" ? (
        <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
          PNG export is lossless. Quality control is hidden because browsers do
          not use the quality parameter for PNG encoding.
        </p>
      ) : (
        <label className="mt-6 block space-y-3">
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
      )}
    </section>
  );
}
