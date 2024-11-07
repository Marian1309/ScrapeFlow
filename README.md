# [Project Name](http://localhost:3000)

> **Warning** This project is still in development and is not ready for production use.

## Prerequisites

You will need [Node.js](https://nodejs.org) version 18.x.x or greater installed on your
system.

## Tech Stack

- **Core:** [React](https://react.dev)
- **TypeScript** [TypeScript](https://www.typescriptlang.org)
- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com)
- **Statemanagement:** [Zustand](https://zustand-demo.pmnd.rs),
  [React Query](https://tanstack.com/query/latest)
- **ORM:** [Prisma](https://www.prisma.io)

## Running Locally

### 1. Install Bun

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. Install Rimraf

```bash
npm install -g rimraf
```

### 3. Clone the repository

```bash
git clone https://github.com/Marian1309/Next.js
```

### 4. Install dependencies

```bash
bun install
```

### 5. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in
the `.env.example` file.

### 6. Run the application

```bash
bun run dev
```

The app should now be up and running at http://localhost:3000 🚀
