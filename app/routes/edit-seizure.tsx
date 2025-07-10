import type { Route } from "./+types/edit-seizure";
import { EditSeizureForm } from "~/components/forms/edit-seizure";
import { redirect, useLoaderData } from "react-router";
import { petService, seizureService } from "~/lib/database";

export async function loader({ params }: Route.LoaderArgs) {
  const seizureId = Number(params.id);
  const seizure = seizureService.getById(seizureId);
  if (!seizure) {
    throw new Response("Seizure log not found.", { status: 404 });
  }
  const pets = petService.getAll();
  return { seizure, pets };
}

export async function action({ request, params }: Route.ActionArgs) {
  const seizureId = Number(params.id);
  const formData = await request.formData();

  const pet_id = Number(formData.get("pet_id"));
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;
  const duration = Number(formData.get("duration"));
  const notes = formData.get("notes") as string;

  const symptoms = formData.getAll("symptoms") as string[];
  const treatment = formData.getAll("treatment") as string[];

  try {
    seizureService.update(seizureId, {
      pet_id,
      type: type as any,
      date,
      duration,
      symptoms,
      treatment,
      notes: notes || undefined,
    });
    return redirect("/logs");
  } catch (error) {
    console.error("Failed to update seizure log:", error);
    return {
      error: "Failed to update seizure log. Please try again. ",
    };
  }
}

export default function EditSeizure() {
  const { seizure, pets } = useLoaderData<typeof loader>();

  return <EditSeizureForm pets={pets} seizure={seizure} />;
}
