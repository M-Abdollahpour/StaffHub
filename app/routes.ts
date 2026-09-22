import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/Login.tsx"),
  layout("routes/DashboardLayout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
