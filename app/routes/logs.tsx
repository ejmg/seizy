import type { Route } from "./+types/logs";
import { Logs, loader } from "../features/logs";

export { loader };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seizure Logs – seizy" },
    { name: "description", content: "View seizure event logs and history" },
  ];
}

export default function LogsPage() {
  return <Logs />;
}
