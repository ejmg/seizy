import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Calendar } from "~/components/ui/calendar";
import type { Pet, SeizureWithPet } from "~/lib/types";
import { Log } from "./logs";
import { Link } from "react-router";

interface DashboardProps {
  seizures: SeizureWithPet[];
  pets: Pet[];
}

const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-20 w-20">
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
          Born{" "}
          {new Date(pet.birth_date).toLocaleDateString("en-US", {
            timeZone: "UTC",
          })}
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
  );
};

export function Dashboard({ seizures, pets }: DashboardProps) {
  return (
    <div className="flex w-full p-8 space-y-4">
      <div className="flex flex-col w-2/3 gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="flex flex-col gap-2 w-5/6">
            {pets.map((pet) => (
              <PetCard pet={pet} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Recent Logs</h2>
          <div className="flex flex-col items-start gap-2 w-5/6">
            {seizures.map((seizure) => (
              <Log key={seizure.id} seizure={seizure} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <Calendar className="w-full rounded-xl bg-card" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Upcoming</h2>
          <div className="flex gap-4 bg-pink-50 border rounded-xl p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreid4pb6wlx7pzq4coldz4tdg2jv5x2uzods6yi7m7ha4iwb5ngwzta@jpeg" />
                <AvatarFallback>Pet</AvatarFallback>
              </Avatar>
              <p className="font-semibold">Pius</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">event</p>
              <p>date</p>
            </div>
          </div>
          <div className="flex justify-start gap-4 bg-purple-100 border rounded-xl p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreiesz7ryrhsma6edxeyv5t3togazupwtvthuquqqcxxv3kpwiz3oeq@jpeg" />
                <AvatarFallback>Pet</AvatarFallback>
              </Avatar>
              <p className="font-semibold">Adelita</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">event</p>
              <p>date</p>
            </div>
          </div>
          <div className="bg-indigo-900 border rounded-full py-2 px-4">
            <p className="text-primary-foreground text-center">
              Quick Schedule
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
