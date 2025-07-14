import type { Route } from "./+types/pets";
import { Pets } from "../components/pets";
import { petService } from "~/lib/database";
import { requireAuth } from "~/lib/auth";

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
  const pets = petService.getAll();
  return { pets };
}

export default function PetsPage() {
  return <Pets />;
}
