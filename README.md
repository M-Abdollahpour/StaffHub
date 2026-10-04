# TechNova HR Panel

A role-based employee management panel built as a portfolio project. Employees (users) manage their own personal profile, while admins oversee organizational data across the company — all backed by a simulated API so the demo runs without a real backend.

## Features

- **Authentication** — email/password login against mock employee data, with role-based redirect after login
- **Role-based access** — two roles, `admin` and `user`, each seeing a tailored dashboard and sidebar
- **Profile management** — employees view and edit their own personal information (contact details, education, work experience, skills, languages), with avatar upload (local preview, no real server)
- **Dynamic, validated forms** — built with `react-hook-form` + `yup`, including dynamic add/remove fields for education and work history
- **Simulated REST API** — mock `get`/`add`/`update`/`remove` functions that mimic real async API calls (with artificial delay), so the data layer can later be swapped for a real backend with minimal changes
- **Persistent session** — logged-in state survives page refresh via Zustand's `persist` middleware

## Tech Stack

- **React** + **TypeScript**
- **React Router** (layout routes for shared sidebar/header)
- **Zustand** — state management (auth store with `persist`)
- **React Hook Form** + **Yup** — form state and validation
- **Ant Design** — UI components (forms, menus, modals, date pickers)
- **Tailwind CSS** — layout and styling

## Project Structure

```
src/
├── components/       # UI components (admin/, user/, profile/, shared)
├── stores/           # Zustand stores (e.g. useAuthStore)
├── types/            # TypeScript types (Employee, roles, etc.)
├── mocks/
│   ├── data/          # Mock employee dataset
│   └── api/           # Simulated API functions (get/add/update/remove)
├── routes/           # Route-level pages (Login, Dashboard, Profile, Employees)
└── hooks/            # Custom hooks
```

## Data Model

Each employee record includes personal info (name, contact, city, address, gender, marital status), professional info (skills, languages, education history, work experience), and organizational info (department, position, role, status, hire date). Organizational fields are managed by admins; personal fields are self-managed by each employee.

## Getting Started

```bash
npm install
npm run dev
```

The app runs entirely on mock data — no backend setup required. Sample login credentials are available in `mocks/data/data.ts`.

## Roadmap

- Employee management page for admins (view/edit organizational data, role-based access control)
- Sign-up flow for new employees
- Dashboard statistics and charts
