# Hackprep

A modular full-stack learning and productivity platform built with **NestJS**, **Next.js**, and **TypeScript**.

## 🚀 Project Overview

This workspace contains two main projects:

- `backend/` — A NestJS API server with authentication, task/project management, and data persistence.
- `frontend/` — A Next.js application powering the main Hackprep user experience.

Additionally, `HackPrep_Full_PRD.pdf` contains the full product requirements document.

---

## 📁 Repository Structure

```text
Hackprep/
├─ backend/              # NestJS API and backend services
├─ frontend/             # Main Next.js frontend application
├─ HackPrep_Full_PRD.pdf # Product requirements document
```

---

## 🧩 Backend

The backend is located in `backend/` and uses:

- `@nestjs/core`, `@nestjs/typeorm`, `@nestjs/jwt`, `passport`, and `passport-google-oauth20`
- PostgreSQL via `pg` and TypeORM
- Authentication with JWT and Google OAuth
- Modules for `users`, `ideas`, `projects`, and `tasks`

### Install & Run

```bash
cd backend
npm install
npm run start:dev
```

### Useful scripts

- `npm run build` — Compile TypeScript
- `npm run start` — Start server
- `npm run start:dev` — Run in watch mode
- `npm run test` — Run unit tests
- `npm run test:e2e` — Run end-to-end tests
- `npm run lint` — Lint codebase

---

## 🌐 Frontend

The main frontend lives in `frontend/` and is built with Next.js, React, Tailwind CSS, and modern UI components.

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

### Useful scripts

- `npm run dev` — Start development server
- `npm run build` — Build production bundle
- `npm run start` — Serve built app
- `npm run lint` — Lint source files

---


## 🛠️ Tech Stack

- Backend: `NestJS`, `TypeScript`, `TypeORM`, `PostgreSQL`, `Passport`, `JWT`
- Frontend: `Next.js`, `React`, `TypeScript`, `Tailwind CSS`, `Framer Motion`

---

## ✨ Notes

- This repository combines a backend API and a user-facing frontend.
- Use `npm install` separately in each project folder before starting them.
- The root contains `HackPrep_Full_PRD.pdf` for the product vision and requirements.

---

## 👤 Author

Built by **Abhishekh Prajapati** — GitHub: [github.com/abhishekh-prajapati](https://github.com/abhishekh-prajapati)

