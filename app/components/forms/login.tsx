import { Form, Link } from "react-router";

export function LoginForm() {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full p-3 border border-gray-300 focus:ring-gray-800"
          />
        </div>

        {/* submit & register */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-primary-foreground py-3 px-4 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p>
            Need an account?{" "}
            <Link
              to="/sign-up"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
