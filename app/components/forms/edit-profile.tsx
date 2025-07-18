import { Form, Link } from "react-router";
import type { User } from "~/lib/types";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface EditProfileProps {
  user: User;
}

export function EditProfileForm({ user }: EditProfileProps) {
  return (
    <div className="flex flex-col w-full max-w-lg p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Edit Profile
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            Edit desired fields and confirm submission with account password.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Form method="POST" className="space-y-6">
            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
                defaultValue={user.email}
              />
            </div>

            {/* name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
                defaultValue={user.name}
              />
            </div>

            {/* password & confirm */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                minLength={8}
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                minLength={8}
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                minLength={8}
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                // className="w-full bg-indigo-600 text-primary-foreground py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                Save Changes
              </Button>
              <Button variant={"secondary"} asChild>
                <Link
                  to="/"
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
