import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Form, Link, useLocation } from "react-router";

const isCurrentPath = (pathname: string, navlink: string) => {
  return pathname === navlink
    ? "border-2 rounded-full bg-indigo-700 py-2 px-4"
    : "py-2 px-4";
};

export function NavBar() {
  const { pathname } = useLocation();
  return (
    <header className="min-h-9 h-20 w-full">
      <nav className="flex justify-start items-center py-2 px-3 h-full text-primary-foreground">
        <div className="flex items-center mr-auto text-xl gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>$USER</p>
        </div>
        <div className="flex gap-4 text-lg pr-2">
          <Link to="/" className={isCurrentPath(pathname, "/")}>
            Dashboard
          </Link>
          <Link to="/pets" className={isCurrentPath(pathname, "/pets")}>
            Pets
          </Link>
          <Link to="/logs" className={isCurrentPath(pathname, "/logs")}>
            Logs
          </Link>
        </div>

        <Form method="POST" action="/logout" className="contents">
          <button
            type="submit"
            className="py-2 px-4 text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </Form>
      </nav>
    </header>
  );
}
