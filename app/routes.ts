import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/logs", "routes/logs.tsx"),
  route("/test", "routes/test.tsx"),
  route("/add-seizure", "routes/add-seizure.tsx"),
] satisfies RouteConfig;
