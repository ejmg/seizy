import { useLoaderData, Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Pet } from "~/lib/types";
import { Button } from "./ui/button";

export function Pets() {
  const { pets } = useLoaderData<{ pets: Pet[] }>();

  return (
    <div className="flex flex-col w-full p-3 sm:p-8 space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Pets</h1>
      {pets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">No pets added yet</p>
          <Button asChild>
            <Link to="/add-pet">Add Pet</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-card border rounded-xl p-3 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-4">
                <Avatar className="h-12 sm:h-24 w-12 sm:w-24">
                  <AvatarImage src={pet.avatar_url} />
                  <AvatarFallback className="text-base sm:text-lg">
                    {pet.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    {pet.name}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    {pet.species} {pet.breed && `– ${pet.breed}`}
                  </p>
                </div>
              </div>
              {pet.birth_date && (
                <p className="text-sm sm:text-base text-gray-500 mb-3">
                  Born {new Date(pet.birth_date).toLocaleDateString()}
                </p>
              )}

              <div className="flex space-x-2">
                <Button asChild size={"lg"}>
                  <Link to={`/edit-pet/${pet.id}`}>Edit</Link>
                </Button>
                <Button asChild variant={"secondary"} size={"lg"}>
                  <Link to={`/logs?pet=${pet.id}`}>Logs</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <Button asChild size={"lg"}>
          <Link to="/add-pet">Add New Pet</Link>
        </Button>
      </div>
    </div>
  );
}
