import { getAuthUserId, requireAuth } from "~/lib/auth";
import type { Route } from "./+types/edit-profile";
import { EditProfileForm } from "~/components/forms/edit-profile";
import { userService } from "~/lib/database";
import { redirect, useLoaderData } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  requireAuth(request);
  const userId = getAuthUserId(request);

  if (!userId) {
    throw new Response("User ID not found.", { status: 404 });
  }

  const user = userService.getById(userId);

  if (!user) {
    throw new Response("User not found.", { status: 404 });
  }

  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  requireAuth(request);

  const userId = getAuthUserId(request);
  if (!userId) throw new Response("User ID not found.", { status: 404 });

  const user = userService.getById(userId);

  if (!user) throw new Response("User not found.", { status: 404 });

  const formData = await request.formData();
  const currentPassword = formData.get("currentPassword") as string;
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!name || !email || !currentPassword) {
    return {
      error: "Name, email, and current password cannot be empty.",
    };
  }

  // NOTE: I could implement more thorough validation logic + DB schema restrictions but this app is so simple that I'm not really
  //       sure that I'm interested in doing that right now.

  const verifiedUser = await userService.verifyPassword(
    user.email,
    currentPassword
  );

  if (!verifiedUser) {
    return {
      error: "Incorrect Password, try again.",
    };
  }

  if (email !== user.email) {
    const emailCheck = userService.getByEmail(email);

    if (emailCheck) {
      return {
        error: "Email already taken.",
      };
    }
  }

  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirm") as string;

  if (newPassword !== "") {
    if (newPassword !== confirmPassword) {
      return {
        error: "New passwords did not match, profile not updated.",
      };
    }
    if (newPassword.length < 8) {
      return {
        error: "New password is less than 8 characters long.",
      };
    }
  }

  try {
    const updateData: { name: string; email: string; password_hash?: string } =
      {
        name,
        email,
      };
    // We have already checked the edge cases. This is now just checking again for the change to apply it.
    if (newPassword) {
      updateData.password_hash = await userService.hashPassword(newPassword);
    }
    userService.update(user.id!, updateData);

    return redirect("/");
  } catch (error) {
    console.error("Error updating profile: ", error);

    return {
      error: "Profile update failed, please try again.",
    };
  }
}

export default function EditProfile() {
  const { user } = useLoaderData<typeof loader>();

  return <EditProfileForm user={user} />;
}
