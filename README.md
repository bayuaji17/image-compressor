# Image Compressor (Image Tools)

> A modern web application for compressing and converting images entirely within your browser.
> Strict privacy — no files are sent to a server. Processing happens completely locally.

## Features

- **Image Compression**: Reduce file sizes smoothly without noticeable quality loss using Web Workers to preserve UI responsiveness.
- **Format Conversion**: Transcode images directly into JPEG, PNG, or WebP formats via the native Canvas API.
- **Privacy-First Processing**: 100% client-side operation, meaning your data never leaves your device.
- **Batch Processing**: Handle multiple files concurrently.
- **Bulk Export**: Download all compressed or converted files neatly packed in a `.zip` archive.

## Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Key Libraries**:
  - `browser-image-compression` (JPEG/PNG/WebP compression via Web Worker)
  - `react-dropzone` (Drag-and-drop uploads)
  - `jszip` & `file-saver` (Bulk archive downloading)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

Install the project dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Run the built application locally:

```bash
npm run start
```
