import { Form, Link } from "react-router";
import type { Pet } from "~/lib/types";

interface EditPetFormProps {
  pet: Pet;
}

export function EditPetForm({ pet }: EditPetFormProps) {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit {pet.name}</h1>
      <Form method="POST" className="space-y-6">
        {/* pet name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Pet Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={pet.name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* species */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium mb-2">
            Species
          </label>
          <select
            id="species"
            name="species"
            defaultValue={pet.species || "dog"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
  focus:ring-gray-800"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* breed */}
        <div>
          <label htmlFor="breed" className="block text-sm font-medium mb-2">
            Breed
          </label>
          <input
            type="text"
            name="breed"
            id="breed"
            defaultValue={pet.breed || ""}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* birth date */}
        <div>
          <label
            htmlFor="birth_date"
            className="block text-sm font-medium mb-2"
          >
            Birth Date
          </label>
          <input
            type="date"
            name="birth_date"
            id="birth_date"
            defaultValue={pet.birth_date || ""}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* avatar */}
        <div>
          <label
            htmlFor="avatar_url"
            className="block text-sm font-medium mb-2"
          >
            Avatar
          </label>
          <input
            type="url"
            name="avatar_url"
            id="avatar_ur"
            defaultValue={pet.avatar_url || ""}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* form actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-primary-foreground py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500"
          >
            Update Pet
          </button>
          <Link
            to="/pets"
            className="flex-1 text-center bg-gray-100 py-3 px-4 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
