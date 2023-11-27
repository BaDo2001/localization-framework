"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce, useToggle } from "usehooks-ts";

import type { KeyFilter } from "@/lib/params";
import { getQueryString } from "@/lib/params";

type Props = {
  initialValues: KeyFilter;
};

const Filter = ({ initialValues }: Props) => {
  const [isFilterOpen, toggleFilter] = useToggle();

  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(initialValues.query ?? "");
  const [emptyOnly, setEmptyOnly] = useState(initialValues.emptyOnly);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    const queryString = getQueryString({
      query: debouncedQuery,
      emptyOnly,
      group: initialValues.group,
    });

    router.push(`${pathname}?${queryString}`);
  }, [emptyOnly, initialValues.group, pathname, debouncedQuery, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleClick = () => setEmptyOnly((value) => !value);

  const handleClear = () => {
    setQuery("");
    setEmptyOnly(false);
  };

  return (
    <div
      className={clsx(
        isFilterOpen && "pb-10",
        "flex flex-col transition-all duration-200",
      )}
    >
      <button
        type="button"
        className={clsx(
          isFilterOpen && "btn-primary",
          "btn btn-md btn-circle self-end",
        )}
        onClick={toggleFilter}
      >
        <FiFilter className="w-5 h-5" />
      </button>

      <div
        className={clsx(
          isFilterOpen ? "max-h-24 pt-2" : "max-h-0",
          "flex flex-col overflow-y-hidden px-1 transition-all duration-200",
        )}
      >
        <div className="flex gap-x-6 items-center mb-1">
          <div className="relative">
            <label htmlFor="query">
              <FaSearch className="absolute left-4 top-1/2 bottom-1/2 -translate-y-1/2" />
            </label>

            <input
              type="text"
              id="query"
              placeholder="Search by key"
              className="input input-bordered w-full max-w-xs pl-10 placeholder:text-base-content"
              value={query}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className={clsx(emptyOnly && "badge-primary", "badge badge-lg p-4")}
            onClick={handleClick}
          >
            Empty only
          </button>
        </div>

        <button
          type="button"
          className="text-sm text-primary self-start"
          onClick={handleClear}
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
