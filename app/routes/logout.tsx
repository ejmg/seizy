import type { Route } from "./+types/logout";
import { redirect } from "react-router";
import { clearAuthCookie } from "../lib/auth";

export async function action() {
  const cookie = clearAuthCookie();

  return redirect("/login", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

export async function loader() {
  return redirect("/login");
}
