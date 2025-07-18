import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Form, Link, useLocation } from "react-router";
import type { User } from "~/lib/types";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

interface NavBarProps {
  user?: User | null;
}

const isCurrentPath = (pathname: string, navlink: string) => {
  return pathname === navlink ? "rounded-md bg-primary" : "";
};

export function NavBar({ user }: NavBarProps) {
  const { pathname } = useLocation();
  return (
    <header className="min-h-9 h-16 sm:h-20 w-full">
      <nav className="flex justify-start items-center py-2 px-2 sm:px-3 h-full text-primary-foreground">
        {user ? (
          <div className="flex items-center mr-auto gap-1 sm:gap-2">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              <AvatarImage src="" />
              <AvatarFallback className="text-primary text-sm sm:text-base">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Link to="/edit-profile">
              <p className="text-base sm:text-xl font-bold truncate max-w-[120px] sm:max-w-none">
                {user.name}
              </p>
            </Link>
          </div>
        ) : (
          <p className="text-xl sm:text-2xl font-bold mr-auto">Seizy</p>
        )}
        <div>
          {user ? (
            <div className="flex gap-1 sm:gap-4 text-xs sm:text-lg items-center">
              <Link
                to="/"
                className={cn(
                  "py-1 px-2 sm:py-2 sm:px-4",
                  isCurrentPath(pathname, "/")
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/pets"
                className={cn(
                  "py-1 px-2 sm:py-2 sm:px-4",
                  isCurrentPath(pathname, "/pets")
                )}
              >
                Pets
              </Link>
              <Link
                to="/logs"
                className={cn(
                  "py-1 px-2 sm:py-2 sm:px-4",
                  isCurrentPath(pathname, "/logs")
                )}
              >
                Logs
              </Link>
              <Form method="POST" action="/logout" className="contents">
                <Button
                  variant="destructive"
                  className="px-2 sm:px-4 text-xs sm:text-lg h-8 rounded-md sm:h-10 sm:py-2"
                >
                  Logout
                </Button>
              </Form>
            </div>
          ) : (
            <div className="flex justify-end gap-1 sm:gap-4 text-xs sm:text-lg items-center ">
              <Link
                to="/login"
                className={cn(
                  "py-1 px-2 sm:py-2 sm:px-4",
                  isCurrentPath(pathname, "/login")
                )}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={cn(
                  "py-1 px-2 sm:py-2 sm:px-4",
                  isCurrentPath(pathname, "/signup")
                )}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
