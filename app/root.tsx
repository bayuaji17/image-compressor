import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Image Tools: Privacy-First Compression & Conversion" },
    {
      name: "description",
      content: "A focused toolkit for reducing file size and switching formats locally in the browser. No uploads. No servers.",
    },
    { property: "og:title", content: "Image Tools" },
    { property: "og:description", content: "Compress and convert images without sending a byte anywhere." },
    { property: "og:type", content: "website" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
        Application Error
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{message}</h1>
      <p className="mt-4 max-w-xl text-base text-slate-600">{details}</p>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
