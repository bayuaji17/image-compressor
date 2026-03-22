import type { Route } from "./+types/_index";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Image Tools" },
    {
      name: "description",
      content: "Compress and convert images directly in the browser.",
    },
  ];
}

export default function Index() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-16 sm:px-10 lg:px-12">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
              Privacy-first browser image lab
            </p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Compress and convert images without sending a byte anywhere.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              A focused toolkit for reducing file size and switching formats
              locally in the browser. No uploads. No waiting on servers. No
              hidden retention.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/compress"
                className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
              >
                Open Compressor
              </Link>
              <Link
                to="/convert"
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
              >
                Open Converter
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureCard
                title="Shrink heavy assets"
                description="Tune size, width, and quality while keeping the UI responsive with web workers."
              />
              <FeatureCard
                title="Switch formats fast"
                description="Transform PNG, JPEG, and WebP locally with canvas-based export controls."
              />
            </div>
            <div className="mt-8 rounded-xl bg-slate-50 p-6 border border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Principles
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-2"><span className="text-teal-500">✓</span> Local-only processing keeps source files on the device.</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> Batch-oriented flows support one-by-one or all-at-once work.</li>
                <li className="flex gap-2"><span className="text-teal-500">✓</span> Shared components keep compress and convert behavior consistent.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard(props: {
  title: string;
  description: string;
}) {
  return (
    <article className="space-y-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
        <div className="h-5 w-5 rounded-md bg-teal-500" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900">
        {props.title}
      </h2>
      <p className="text-sm leading-6 text-slate-600">
        {props.description}
      </p>
    </article>
  );
}
