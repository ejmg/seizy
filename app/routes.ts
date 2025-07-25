import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("/logs", "routes/logs.tsx"),
  route("/test", "routes/test.tsx"),
  route("/add-seizure", "routes/add-seizure.tsx"),
  route("/edit-seizure/:id", "routes/edit-seizure.tsx"),
  route("/add-pet", "routes/add-pet.tsx"),
  route("/pets", "routes/pets.tsx"),
  route("/edit-pet/:id", "routes/edit-pet.tsx"),
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/logout", "routes/logout.tsx"),
  route("/edit-profile", "routes/edit-profile.tsx"),
] satisfies RouteConfig;
