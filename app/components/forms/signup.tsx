import { Form, Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";

export function SignupForm() {
  return (
    <div className="flex flex-col w-full max-w-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <Card>
        <CardHeader>
          <CardDescription>
            <p className="mb-2">
              If your email has been approved to register, you can setup an
              account.
            </p>
            <p>
              Already have an account?
              <Button variant={"link"} className="p-0 pl-1 pt-1" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
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
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            {/* password & confirm */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
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
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                minLength={8}
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              // className="w-full bg-indigo-600 text-primary-foreground py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              Complete Registration
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
