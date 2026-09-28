# Express.js Backend Starter

A minimal Express.js and TypeScript backend starter for students. Clone this repository to begin building an API without having to configure the initial server setup.

## Included

- Express 5 with JSON request-body parsing
- TypeScript configuration
- Development reloading with Nodemon and `tsx`
- A sample `GET /` route at `http://localhost:3000`

## Getting Started

Clone the repository, then install its dependencies with pnpm:

```bash
git clone <repository-url>
cd express-template
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to confirm the server is running. Add routes and application code in `src/index.ts` as you work through the course.

## Production Build

```bash
pnpm build
pnpm start
```

## Use Your Own Repository

After cloning this starter, create a new empty repository in your own GitHub account. Do not initialize it with a README, `.gitignore`, or license.

Replace the template repository remote with your new repository, then push your work:

```bash
git remote rename origin upstream
git remote add origin https://github.com/<your-username>/<your-repository>.git
git branch -M main
git push -u origin main
```

Your work will now be pushed to your repository. The original starter remains available as `upstream` if you need to refer back to it.
