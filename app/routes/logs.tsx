import type { Route } from "./+types/logs";
import { Logs } from "../components/logs";
import { seizureService } from "~/lib/database";
import { requireAuth } from "~/lib/auth";

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
  return { seizures: seizureService.getAll() };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seizure Logs – seizy" },
    { name: "description", content: "View seizure event logs and history" },
  ];
}

export default function LogsPage() {
  return <Logs />;
}
