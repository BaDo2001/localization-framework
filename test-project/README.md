# Demo site for localization framework

## Pre-requisites

- Node.js
- pnpm

## Getting Started

### Get env variables

Create a .env file in the root of the project based on the .env.example file.

### Install dependencies

```bash
pnpm install
```

### Add locales

In this demo you can add local translations for fallback as well, which should be located in `~/public/locales/`.

For this reason you need to create the folder, otherwise the build will fail.

### Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
