import { Form, Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";

export function LoginForm() {
  return (
    <div className="flex flex-col w-full max-w-lg p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Login</h1>
      <Card className="w-full">
        <CardContent>
          <Form method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
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
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>
            <Button type="submit">Login</Button>
          </Form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <p>
              Need an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Sign Up
              </Link>
            </p>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
