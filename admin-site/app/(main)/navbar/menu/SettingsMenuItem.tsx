"use client";

import { FiSettings } from "react-icons/fi";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  projectId: string;
};

const SettingsMenuItem = ({ projectId }: Props) => {
  const pathname = usePathname();
  const settingsLink = `/projects/${projectId}/settings`;

  return (
    <li>
      <Link
        href={settingsLink}
        className={clsx(pathname === settingsLink && "active")}
      >
        <summary className="flex items-center gap-x-2">
          <FiSettings />
          Settings
        </summary>
      </Link>
    </li>
  );
};

export default SettingsMenuItem;
