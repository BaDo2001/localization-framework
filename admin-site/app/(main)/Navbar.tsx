"use client";

import { FaChevronLeft } from "react-icons/fa";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="flex flex-col items-center bg-base-100 py-8 px-4 w-80">
      <button
        className="btn btn-outline w-2/3"
        type="button"
        onClick={handleSignOut}
      >
        Sign out
      </button>

      {pathname !== "/" && (
        <Link href="/" className="btn [&>svg]:w-6 [&>svg]:h-6 mt-auto">
          <FaChevronLeft />
          Back to home
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
