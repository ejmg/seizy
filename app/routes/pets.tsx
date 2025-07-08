import type { Route } from "./+types/pets";
import { Pets } from "../components/pets";
import { petService } from "~/lib/database";

export async function loader() {
  const pets = petService.getAll();
  return { pets };
}

export default function PetsPage() {
  return <Pets />;
}
