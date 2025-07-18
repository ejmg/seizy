import { Link, useLoaderData } from "react-router";
import type { SeizureWithPet } from "~/lib/types";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

interface LogProps extends React.ComponentProps<"div"> {
  seizure: SeizureWithPet;
}

export function Log({ seizure, className, ...props }: LogProps) {
  return (
    <div
      className={cn("border rounded-lg p-2 sm:p-6 bg-card", className)}
      {...props}
    >
      <div className="flex justify-between">
        <h3 className="text-lg sm:text-xl font-semibold">{seizure.type}</h3>
        <span className="text-sm sm:text-base text-gray-500 pt-1 sm:pt-0">
          {new Date(seizure.date).toLocaleString()}
        </span>
      </div>
      <p>Duration: {seizure.duration} seconds</p>
      <p>Symptoms: {seizure.symptoms?.join(", ")}</p>
      <p>Treatments: {seizure.treatment?.join(", ")}</p>
      {seizure.notes && <p>Notes: {seizure.notes}</p>}
      <div className="flex flex-row-reverse">
        <Button asChild size={"lg"} className="mt-2 sm:mt-0">
          <Link
            to={`/edit-seizure/${seizure.id}`}
            // className="w-fit text-center text-primary-foreground px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 focus:ring-indigo-500"
          >
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function Logs() {
  const { seizures } = useLoaderData<{ seizures: SeizureWithPet[] }>();

  return (
    <div className="flex flex-col w-full p-3 sm:p-8 sm:space-y-4 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Seizure Logs</h1>
      <div className="flex sm:space-x-2">
        <Button asChild size={"lg"}>
          <Link
            to="/add-seizure"
            // className="w-fit text-center bg-indigo-600 text-primary-foreground py-2 px-4 rounded-lg hover:bg-indigo-800 focus:ring-indigo-500"
          >
            Record Log
          </Link>
        </Button>
      </div>
      <div className="space-y-2">
        {seizures.map((seizure) => (
          <Log seizure={seizure} />
        ))}
      </div>
    </div>
  );
}
