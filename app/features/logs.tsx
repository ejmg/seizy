import { useLoaderData } from "react-router";
import mockData from "~/MOCK_DATA.json";

type SeizureRecord = {
  id: number;
  type: string;
  date: string;
  duration: number;
  symptoms: string[];
  treatment: string[];
  notes: string;
};

export async function loader() {
  return { seizures: mockData as SeizureRecord[] };
}

export function Logs() {

  const { seizures } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col p-8 space-y-4">
      <h1 className="text-3xl font-bold text-primary-foreground">Seizure Logs</h1>
      <div className="space-y-2">
        {seizures.map((seizure) => (
          <div key={seizure.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between">
              <h3 className="font-semibold">{seizure.type}</h3>
              <span className="text-sm text-gray-500">{new Date(seizure.date).toLocaleDateString()}</span>
            </div>
            <p>Duration: {seizure.duration}</p>
            <p>Symptoms: {seizure.symptoms.join(", ")}</p>
            <p>Treatments: {seizure.treatment.join(", ")}</p>
            {seizure.notes && <p>Notes: {seizure.notes}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
