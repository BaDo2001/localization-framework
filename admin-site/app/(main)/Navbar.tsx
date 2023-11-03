import { SignOutButton } from "@clerk/nextjs";

const Navbar = async () => (
  <nav className="flex flex-col items-center bg-base-100 py-8 px-4 w-80">
    <SignOutButton>
      <button className="btn btn-outline w-2/3" type="button">
        Sign out
      </button>
    </SignOutButton>
  </nav>
);

export default Navbar;
