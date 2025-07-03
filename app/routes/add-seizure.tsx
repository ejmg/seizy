import type { Route } from "./+types/add-seizure";
import { AddSeizureForm } from "~/components/forms/add-seizure";
import { redirect, useLoaderData } from "react-router";
import { petService, seizureService } from "~/lib/database";

export async function loader() {
  const pets = petService.getAll();
  return { pets };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const pet_id = Number(formData.get("pet_id"));
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;
  const duration = Number(formData.get("duration"));
  const notes = formData.get("notes") as string;

  const symptoms = formData.getAll("symptoms") as string[];
  const treatment = formData.getAll("treatment") as string[];

  try {
    const seizureId = seizureService.create({
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
    console.error("Failed to create seizure log:", error);
    return {
      error: "Failed to record seizure. Please try again.",
    };
  }
}

export default function AddSeizure() {
  const { pets } = useLoaderData<typeof loader>();
  return <AddSeizureForm pets={pets} />;
}
