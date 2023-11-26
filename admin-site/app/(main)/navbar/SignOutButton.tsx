"use client";

import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button className="btn btn-outline" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};

export default SignOutButton;
