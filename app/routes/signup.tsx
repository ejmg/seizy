import { userService } from "~/lib/database";
import type { Route } from "./+types/signup";
import { SignupForm } from "~/components/forms/signup";
import { redirect } from "react-router";
import { createAuthCookie, getAuthUserId } from "~/lib/auth";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = getAuthUserId(request);

  if (userId) throw redirect("/");
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const confirmPw = formData.get("confirm") as string;

  if (!email || !name || !password || !confirmPw) {
    return {
      error: "All fields are required.",
    };
  }

  if (password !== confirmPw) {
    return {
      error: "Passwords do not match. Please try again.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
    };
  }

  try {
    if (!userService.isEmailApproved(email)) {
      return {
        error: "Email is not approved for registration. Contact admin.",
      };
    }

    const newUser = userService.getByEmail(email);

    if (!newUser) {
      return {
        error:
          "Email not found in system. This should not happen, please contact admin.",
      };
    }

    if (newUser?.status === "active") {
      return {
        error: "Account already activated. Please login.",
      };
    }

    const password_hash = await userService.hashPassword(password);

    userService.update(newUser.id!, {
      name,
      password_hash,
      status: "active",
    });

    // assertion: User and userId should always exist.
    const cookie = createAuthCookie(newUser.id!);

    return redirect("/login", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return {
      error: "Signup failed, please try again.",
    };
  }
}

export default function Signup() {
  return <SignupForm />;
}
