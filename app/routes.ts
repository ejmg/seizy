import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/logs", "routes/logs.tsx"),
  route("/test", "routes/test.tsx"),
  route("/add-seizure", "routes/add-seizure.tsx"),
  route("/add-pet", "routes/add-pet.tsx"),
  route("/pets", "routes/pets.tsx"),
] satisfies RouteConfig;
