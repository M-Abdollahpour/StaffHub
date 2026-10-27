# StaffHub — HR Management Panel

A role-based employee management panel built as a front-end portfolio project. Employees sign up, manage their own profile and see a live session timer, while admins manage the company's employee records and view charts. The app runs entirely in the browser on mock data, so there is no backend to set up.

**Live demo:** https://staff-hub-rosy.vercel.app/

## Demo accounts

| Role  | Email                          | Password         |
| ----- | ------------------------------ | ---------------- |
| Admin | `lucas.roberts23@technova.dev` | `UQ6ufaRP$Y!fG`  |
| User  | `oliver.parker1@technova.dev`  | `BW@@*d4SgTCZGa` |

You can also create your own account from the sign-up page. Sessions last 10 minutes.

## Features

**Authentication**

- Login with email and password against the mock employee list (emails are case-insensitive)
- Sign-up with validation, password rules (8+ characters with a letter, a number and a special character) and a duplicate-email check
- Simulated forgot-password flow (no email is sent; the password is reset directly)
- Session persists across page refreshes
- Session timer in the header with a countdown that turns red under 60 seconds; when it runs out, an overlay appears and the user is logged out automatically

**Employee profile (all users)**

- View and edit personal information, languages and skills
- Dynamic education and work-experience lists (add and remove entries) built with `useFieldArray`
- Year pickers, per-field validation messages and a loading state on save
- Avatar upload with a local preview (the image is not stored)

**Admin tools**

- Employee table with column search and highlighting, sorting, role and status filters, and pagination
- Edit an employee's organizational fields (role, status, department, position, hire date) and remove employees with a confirmation modal
- Charts page with bar charts for department, position, status, role and marital status, built on a reusable `CountChart` component that highlights the most common category

**Role-based navigation**

- A shared dashboard layout with a collapsible sidebar; the Employees and Charts sections only appear in the navigation for admins

## Tech stack

- **React 19** and **TypeScript**
- **React Router** in framework mode (SPA, `ssr: false`) with a layout route for the dashboard
- **Zustand** with the `persist` middleware for auth, employees and the session timer
- **React Hook Form** and **Yup** for forms and validation
- **Ant Design** (tables, forms, selects, date pickers, modals) and **Tailwind CSS**
- **ApexCharts** (`react-apexcharts`) for charts
- **Vite**

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build       # production build
npm run typecheck   # generate route types and run tsc
```

## Project structure

```
app/
├── components/
│   ├── admin/        # admin dashboard content
│   ├── users/        # user dashboard content
│   ├── charts/       # reusable CountChart
│   ├── employees/    # employee table (view) and admin edit form
│   ├── profile/      # profile view and edit form
│   └── timeOut/      # session countdown
├── mocks/data/       # 100 mock employees across 10 departments
├── routes/           # login, signup, forgot password, dashboard layout and pages
├── stores/           # useAuthStore, useEmployeesStore, useTimerStore
├── types/            # Employee type and related unions
├── utils/            # countBy, getTopPoints
└── routes.ts         # route configuration
```

## How it works

- **Data layer:** `useEmployeesStore` holds the employee list, seeded from `mocks/data/data.ts`, and exposes `addEmployee`, `updateEmployee` and `removeEmployee`. Every screen reads and writes employees through this store. Short timeouts in the UI simulate network latency and loading states.
- **Auth:** `useAuthStore` looks users up in the employee store, keeps `currentUser`, and clears the session timer on logout. `useTimerStore` stores the session end time rather than the remaining seconds, so the countdown stays correct after a refresh.
- **Forms:** each form defines a Yup schema and connects to React Hook Form through `yupResolver`. Ant Design inputs such as `Select` and `DatePicker` are connected with `Controller`.

## Good to know

This is a demo, not a production auth system. Passwords are stored in plain text in the mock data, and all state (`auth`, `employees`, `timer-storage`) lives in `localStorage`. To reset the demo to its original data, clear the site's local storage.

## Roadmap

- Route guards: redirect logged-out visitors to the login page and block admin-only routes for regular users
- A distinct admin dashboard with company statistics (both roles currently see a welcome message)
- Replace the mock store with a real API
- Avatar persistence and more charts (skills, languages)
