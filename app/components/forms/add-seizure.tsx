import { Form } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "../ui/button";
import type { Pet } from "~/lib/types";

export const SEIZURE_TYPES = [
  "focal-aware",
  "focal-impaired",
  "absence",
  "myoclonic",
  "tonic",
  "clonic",
  "tonic-clonic",
  "atonic",
] as const;

export const COMMON_SYMPTOMS = [
  "Loss of consciousness",
  "Muscle jerking",
  "Confusion",
  "Aura",
  "Snapping jaw",
  "Pacing",
  "Drooling",
  "Bladder control loss",
];

export const COMMON_TREATMENTS = [
  "750mg Keppra",
  "100mg Pheno",
  "Midazolam",
  "Valium",
  "Emergency vet visit",
];

export function AddSeizureForm({ pets }: { pets: Pet[] }) {
  return (
    <div className="flex flex-col w-full max-w-lg p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Record Seizure Event
      </h1>
      <Card className="w-full">
        <CardContent className="w-full">
          <Form method="post" className="space-y-6 w-full">
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
                defaultValue={2}
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
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 
  focus:ring-indigo-500"
            >
              Record Seizure Event
            </button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
