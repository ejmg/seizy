import { Form } from "react-router";

export function AddPetForm() {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Pet</h1>
      <Form method="POST" className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Pet Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label htmlFor="species" className="block text-sm font-medium mb-2">
              Species
            </label>
            <select
              id="species"
              name="species"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="breed" className="block text-sm font-medium mb-2">
              Breed
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              placeholder="Labrador, Russian Blue, Lionhead, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="avatar_url"
              className="block text-sm font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              type="url"
              name="avatar_url"
              id="avatar_url"
              placeholder="https://example.com/pet-photo.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500"
          >
            Add Pet
          </button>
        </div>
      </Form>
    </div>
  );
}
