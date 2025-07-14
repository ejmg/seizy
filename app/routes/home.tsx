import type { Route } from "./+types/home";
import { Dashboard } from "../components/dashboard";
import { requireAuth } from "~/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seizy" },
    { name: "description", content: "a basic app for tracking pet health" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
  return {};
}

export default function Home() {
  return <Dashboard />;
}
