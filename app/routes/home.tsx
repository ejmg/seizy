import type { Route } from "./+types/home";
import { Dashboard } from "../features/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seizy" },
    { name: "description", content: "a basic app for tracking pet health" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
