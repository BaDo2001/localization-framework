"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  getQueryString,
  type KeyFilter,
  parseBooleanQueryParam,
} from "@/lib/params";

type Props = {
  pathSegment: string;
  absolutePath: string;
};

const Summary = ({ pathSegment, absolutePath }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter: KeyFilter = {
    query: searchParams.get("query"),
    emptyOnly: parseBooleanQueryParam(searchParams.get("emptyOnly")),
    group: searchParams.get("group"),
  };

  const handleClick = () => {
    const queryString = getQueryString({
      ...filter,
      group: filter.group === absolutePath ? undefined : absolutePath,
    });

    router.push(`${pathname}?${queryString}`);
  };

  return (
    <summary
      className={clsx(
        filter.group === absolutePath && "active",
        "font-medium cursor-pointer",
      )}
      onClick={handleClick}
    >
      {pathSegment}
    </summary>
  );
};

export default Summary;
