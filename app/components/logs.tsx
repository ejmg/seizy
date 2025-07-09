import { useLoaderData } from "react-router";
import type { SeizureWithPet } from "~/lib/types";

export function Logs() {
  const { seizures } = useLoaderData<{ seizures: SeizureWithPet[] }>();

  return (
    <div className="flex flex-col w-full p-8 space-y-4">
      <h1 className="text-3xl font-bold">Seizure Logs</h1>
      <div className="space-y-2">
        {seizures.map((seizure) => (
          <div key={seizure.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between">
              <h3 className="font-semibold">{seizure.type}</h3>
              <span className="text-sm text-gray-500">
                {new Date(seizure.date).toLocaleDateString()}
              </span>
            </div>
            <p>Duration: {seizure.duration} seconds</p>
            <p>Symptoms: {seizure.symptoms?.join(", ")}</p>
            <p>Treatments: {seizure.treatment?.join(", ")}</p>
            {seizure.notes && <p>Notes: {seizure.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
