import type { Route } from "./+types/dashboard";
import { Dashboard } from "../components/dashboard";
import { requireAuth } from "~/lib/auth";
import { petService, seizureService } from "~/lib/database";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seizy" },
    { name: "description", content: "a basic app for tracking pet health" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
  const seizures = seizureService.getAll();
  const pets = petService.getAll();
  return { seizures, pets };
}

export default function DashboardPage() {
  const { seizures, pets } = useLoaderData<typeof loader>();
  return <Dashboard seizures={seizures} pets={pets} />;
}
