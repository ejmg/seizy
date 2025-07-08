import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Link } from "react-router";

export function NavBar() {
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
          <Link to="/" className="border rounded-full py-2 px-4">
            Dashboard
          </Link>
          <Link to="/pets" className="py-2 px-4">
            pets
          </Link>
          <Link to="/logs" className="py-2 px-4">
            Logs
          </Link>
        </div>
      </nav>
    </header>
  );
}
