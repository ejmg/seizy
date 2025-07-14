import type { Route } from "./+types/add-pet";
import { redirect } from "react-router";
import { petService } from "~/lib/database";
import { AddPetForm } from "~/components/forms/add-pet";
import { requireAuth } from "~/lib/auth";

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const species = formData.get("species") as string;
  const breed = formData.get("breed") as string;
  const birth_date = formData.get("birth_date") as string;
  const avatar_url = formData.get("avatar_url") as string;

  try {
    const petId = petService.create({
      name,
      species: species || undefined,
      breed: breed || undefined,
      birth_date: birth_date || undefined,
      avatar_url: avatar_url || undefined,
    });

    return redirect("/pets");
  } catch (error) {
    console.error("Failed to create pet: ", error);
    return {
      error: "Failed to add pet. Please try again.",
    };
  }
}

export default function AddPet() {
  return <AddPetForm />;
}
