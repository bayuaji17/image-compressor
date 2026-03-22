import type { Route } from "./+types/convert";
import { DropZone } from "../components/DropZone";
import { FormatSelector } from "../components/FormatSelector";
import { ImageCard } from "../components/ImageCard";
import { Navbar } from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import { useImageConverter } from "../hooks/useImageConverter";
import { downloadAllAsZip, downloadFile } from "../utils/downloadUtils";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Convert Images | Image Tools" },
    {
      name: "description",
      content: "Convert image formats locally in your browser.",
    },
  ];
}

export default function ConvertRoute() {
  const { t } = useTranslation();
  const {
    images,
    options,
    setOptions,
    addFiles,
    convertOne,
    convertAll,
    removeImage,
    clearAll,
  } = useImageConverter();
  const hasCompleted = images.some((image) => image.status === "done");

  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 pt-8 sm:px-10 lg:px-12">
        <PageIntro
          eyebrow={t("convert.eyebrow")}
          title={t("convert.title")}
          description={t("convert.description")}
        />
        <DropZone onFiles={addFiles} />
        <FormatSelector options={options} onChange={setOptions} />
        <ProgressBar images={images} />
        <Toolbar
          hasCompleted={hasCompleted}
          hasImages={images.length > 0}
          onClearAll={clearAll}
          onDownloadAll={() => void downloadAllAsZip(images)}
          onProcessAll={() => void convertAll()}
        />
        <ImageGrid
          images={images}
          onDownload={downloadFile}
          onProcess={convertOne}
          onRemove={removeImage}
          processLabel={t("common.convert")}
          emptyLabel={t("convert.empty_state")}
        />
      </main>
    </div>
  );
}

function PageIntro(props: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
        {props.eyebrow}
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {props.title}
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        {props.description}
      </p>
    </section>
  );
}

function Toolbar(props: {
  hasCompleted: boolean;
  hasImages: boolean;
  onProcessAll: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
}) {
  const { t } = useTranslation();
  return (
    <section className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={props.onProcessAll}
        disabled={!props.hasImages}
        className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {t("common.convert_all")}
      </button>
      <button
        type="button"
        onClick={props.onDownloadAll}
        disabled={!props.hasCompleted}
        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400 disabled:shadow-none"
      >
        {t("common.download_all_zip")}
      </button>
      <button
        type="button"
        onClick={props.onClearAll}
        disabled={!props.hasImages}
        className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
      >
        {t("common.clear_all")}
      </button>
    </section>
  );
}

function ImageGrid(props: {
  images: ReturnType<typeof useImageConverter>["images"];
  processLabel: string;
  emptyLabel: string;
  onRemove: (id: string) => void;
  onProcess: (id: string) => void | Promise<void>;
  onDownload: (
    image: ReturnType<typeof useImageConverter>["images"][number],
  ) => void;
}) {
  if (props.images.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
        {props.emptyLabel}
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {props.images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          processLabel={props.processLabel}
          onRemove={props.onRemove}
          onProcess={(id) => void props.onProcess(id)}
          onDownload={props.onDownload}
        />
      ))}
    </section>
  );
}
