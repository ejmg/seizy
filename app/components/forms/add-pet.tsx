import { Form } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "../ui/button";

export function AddPetForm() {
  return (
    <div className="flex flex-col w-full max-w-lg p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Add New Pet</h1>
      <Card className="w-full">
        <CardContent>
          <Form method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Antoninus Ataturk Bronstein Pius"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="species"
                className="block text-sm font-medium mb-2"
              >
                Species
              </label>
              <select
                id="species"
                name="species"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
              />
            </div>
            <Button type="submit">Add Pet</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
