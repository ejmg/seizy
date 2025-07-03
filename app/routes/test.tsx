import { petService, seizureService } from "~/lib/database";
import type { Route } from "./+types/test";
import { useLoaderData } from "react-router";

export async function loader() {
  try {
    const pets = petService.getAll();
    const seizures = seizureService.getAll();
    return {
      pets,
      seizures,
      status: "success",
    };
  } catch (error) {
    return {
      pets: [],
      seizures: [],
      status: "error",
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

export default function Test() {
  const { pets, seizures, status, error } = useLoaderData<typeof loader>();

  // if (pets.length === 0) {
  //   petService.create({
  //     name: "Antoninus Pius",
  //     species: "dog",
  //     breed: "Lab Mix",
  //     birth_date: "2018-07-15",
  //     avatar_url:
  //       "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreid4pb6wlx7pzq4coldz4tdg2jv5x2uzods6yi7m7ha4iwb5ngwzta@jpeg",
  //   });
  // }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Database Test</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Status: {status}</h2>
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>

        <div>
          <h3 className="text-lg font-medium">Pets ({pets.length})</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(pets, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-medium">Seizures ({seizures.length})</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(seizures, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
