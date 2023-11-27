"use client";

import { FaChevronLeft } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BackToHomeButton = () => {
  const pathname = usePathname();

  return pathname !== "/" ? (
    <Link href="/" className="btn [&>svg]:w-6 [&>svg]:h-6">
      <FaChevronLeft />
      Back to home
    </Link>
  ) : null;
};

export default BackToHomeButton;
