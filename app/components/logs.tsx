import { Link, useLoaderData } from "react-router";
import type { SeizureWithPet } from "~/lib/types";
import { cn } from "~/lib/utils";

interface LogProps extends React.ComponentProps<"div"> {
  seizure: SeizureWithPet;
}

export function Log({ seizure, className, ...props }: LogProps) {
  return (
    <div className={cn("border rounded-lg p-4 bg-white", className)} {...props}>
      <div className="flex justify-between">
        <h3 className="font-semibold">{seizure.type}</h3>
        <span className="text-sm text-gray-500">
          {new Date(seizure.date).toLocaleString()}
        </span>
      </div>
      <p>Duration: {seizure.duration} seconds</p>
      <p>Symptoms: {seizure.symptoms?.join(", ")}</p>
      <p>Treatments: {seizure.treatment?.join(", ")}</p>
      {seizure.notes && <p>Notes: {seizure.notes}</p>}
      <div className="flex flex-row-reverse">
        <Link
          to={`/edit-seizure/${seizure.id}`}
          className="w-fit text-center text-primary-foreground px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 focus:ring-indigo-500"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export function Logs() {
  const { seizures } = useLoaderData<{ seizures: SeizureWithPet[] }>();

  return (
    <div className="flex flex-col w-full p-8 space-y-4">
      <h1 className="text-3xl font-bold">Seizure Logs</h1>
      <div className="flex space-x-2">
        <Link
          to="/add-seizure"
          className="w-fit text-center bg-indigo-600 text-primary-foreground py-2 px-4 rounded-lg hover:bg-indigo-800 focus:ring-indigo-500"
        >
          Record Log
        </Link>
      </div>
      <div className="space-y-2">
        {seizures.map((seizure) => (
          <Log seizure={seizure} />
        ))}
      </div>
    </div>
  );
}
