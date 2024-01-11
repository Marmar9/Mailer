import { ModeToggle } from "./ModeToggle";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className=" w-full h-20 flex pb-2">
      <div className=" h-full w-1/6">
        <ModeToggle />
      </div>
      <div className=" w-4/6 flex items-center">
        <Input className=" h-14" type="email" placeholder="Search ..." />
      </div>
      {/* <div className=" h-full w-1/6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}
    </nav>
  );
}
