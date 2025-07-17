import { Form, Link } from "react-router";
import {
  SEIZURE_TYPES,
  COMMON_SYMPTOMS,
  COMMON_TREATMENTS,
} from "./add-seizure";
import type { Pet, SeizureWithPet } from "~/lib/types";
import { trimIsoForDateTimeLocal } from "~/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface EditSeizureFormProps {
  seizure: SeizureWithPet;
  pets: Pet[];
}

export function EditSeizureForm({ seizure, pets }: EditSeizureFormProps) {
  return (
    <div className="flex flex-col w-full max-w-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Seizure Log</h1>
      <Card className="w-full">
        <CardContent className="w-full">
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="pet_id"
                className="block text-sm font-medium mb-2"
              >
                Pet
              </label>
              <select
                id="pet_id"
                name="pet_id"
                defaultValue={seizure.pet_id}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              >
                <option value="">Select a pet</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Seizure Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Seizure Type
              </label>
              <select
                id="type"
                name="type"
                required
                defaultValue={seizure.type}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              >
                <option value="">Select seizure type</option>
                {SEIZURE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                defaultValue={trimIsoForDateTimeLocal(seizure.date)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium mb-2"
              >
                Duration (seconds)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="1"
                defaultValue={seizure.duration}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Symptoms</label>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_SYMPTOMS.map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="symptoms"
                      value={symptom}
                      defaultChecked={seizure.symptoms?.includes(symptom)}
                      className="rounded border-gray-300 focus:ring-gray-800"
                    />
                    <span className="text-sm">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Treatments - Multiple checkboxes */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Treatments Given
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_TREATMENTS.map((treatment) => (
                  <label
                    key={treatment}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      name="treatment"
                      value={treatment}
                      defaultChecked={seizure.treatment?.includes(treatment)}
                      className="rounded border-gray-300 focus:ring-gray-800"
                    />
                    <span className="text-sm">{treatment}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Additional details about the seizure event..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
                defaultValue={seizure.notes}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button type="submit">Update Log</Button>
              <Button variant="secondary" asChild>
                <Link
                  to="/logs"
                  // className="flex-1 text-center bg-gray-100 py-3 px-4 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </Link>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
