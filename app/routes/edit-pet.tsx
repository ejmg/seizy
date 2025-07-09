import type { Route } from "./+types/edit-pet";
import { EditPetForm } from "../components/forms/edit-pet";
import { redirect, useLoaderData } from "react-router";
import { petService } from "~/lib/database";

export async function loader({ params }: Route.LoaderArgs) {
  const petId = Number(params.id);
  const pet = petService.getById(petId);
  if (!pet) {
    throw new Response("Pet not found.", { status: 404 });
  }
  return { pet };
}

export async function action({ request, params }: Route.ActionArgs) {
  const petId = Number(params.id);
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const species = formData.get("species") as string;
  const breed = formData.get("breed") as string;
  const birth_date = formData.get("birth_date") as string;
  const avatar_url = formData.get("avatar_url") as string;

  try {
    petService.update(petId, {
      name,
      species: species || "dog",
      breed: breed || undefined,
      birth_date: birth_date || undefined,
      avatar_url: avatar_url || undefined,
    });

    return redirect("/pets");
  } catch (error) {
    console.error("Failed to update pet:", error);
    return {
      error: "Failed to update pet. Please try again. ",
    };
  }
}

export default function EditPet() {
  const { pet } = useLoaderData<typeof loader>();

  return <EditPetForm pet={pet} />;
}
