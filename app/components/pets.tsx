import { useLoaderData, Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Pet } from "~/lib/types";

export function Pets() {
  const { pets } = useLoaderData<{ pets: Pet[] }>();

  return (
    <div className="flex w-full p-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Pets</h1>
        <Link
          to="/add-pet"
          className="bg-indigo-600 text-primary-foreground px-4 py-2 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 w-fit"
        >
          Add New Pet
        </Link>
        {pets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No pets added yet</p>
            <Link
              to="/add-pet"
              className="bg-indigo-600 text-primary-foreground py-2 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500"
            ></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={pet.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {pet.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{pet.name}</h3>
                    <p className="text-gray-600">
                      {pet.species} {pet.breed && `– ${pet.breed}`}
                    </p>
                  </div>
                </div>
                {pet.birth_date && (
                  <p className="text-sm text-gray-500 mb-3">
                    Born {new Date(pet.birth_date).toLocaleDateString()}
                  </p>
                )}

                <div className="flex space-x-2">
                  <Link
                    to={`/edit-pet/${pet.id}`}
                    className="flex-1 text-center bg-indigo-600 text-primary-foreground py-2 rounded-lg hover:bg-indigo-800"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/logs?pet=${pet.id}`}
                    className="flex-1 text-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
                  >
                    View Logs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
