# Admin site for localization framework

## Pre-requisites

- Node.js
- pnpm
- Docker

## Getting Started

### Get env variables

Create a .env file in the root of the project based on the .env.example file.

### Install dependencies

```bash
pnpm install
```

### Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run migrations

```bash
npx prisma migrate dev
```
