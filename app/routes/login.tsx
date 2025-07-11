import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { userService } from "~/lib/database";
import { createAuthCookie, getAuthUserId } from "~/lib/auth";
import { LoginForm } from "~/components/forms/login";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = getAuthUserId(request);

  // Already logged in, get out of here.
  if (userId) {
    throw redirect("/");
  }

  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await userService.verifyPassword(email, password);
    if (!user) {
      return {
        error: "Invalid email or password.",
      };
    }

    if (user.status === "pending") {
      return {
        error: "Account not registered yet. Please sign up.",
      };
    }

    // assertion precondition: user ID should always be present.
    const cookie = createAuthCookie(user.id!);

    return redirect("/", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return {
      error: "Error occurred while logging in, please try again.",
    };
  }
}

export default function Login() {
  return <LoginForm />;
}
