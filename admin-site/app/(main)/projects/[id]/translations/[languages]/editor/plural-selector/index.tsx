"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { OptionProps, SingleValue, SingleValueProps } from "react-select";
import Select from "react-select";

import clsx from "clsx";

import { getPluralName, getPluralsExcluding } from "@/lib/plurals";

type SelectOption = {
  label: string;
  value: string;
};

type CustomOptionProps = OptionProps<SelectOption>;

const CustomOption: FC<CustomOptionProps> = ({
  innerProps,
  data,
  isSelected,
}) => (
  <div
    {...innerProps}
    className={clsx(
      "px-2 py-1 cursor-pointer flex items-center gap-4",
      isSelected ? "bg-primary text-primary-content" : "hover:bg-base-300",
    )}
  >
    <span>{data.label}</span>
  </div>
);

type CustomSingleValueProps = SingleValueProps<SelectOption>;

const CustomSingleValue: FC<CustomSingleValueProps> = ({ data }) => (
  <div className="flex items-center gap-4 absolute inset-0 ml-2">
    <span className="h-full">{data.label}</span>
  </div>
);

type Props = {
  value: string | null | string[];
  onChange: (value: string | null | string[]) => void;
  pluralsToExclude?: string[];
};

const PluralSelector: FC<Props> = ({
  value,
  onChange,
  pluralsToExclude = [],
}) => {
  const options: SelectOption[] = useMemo(() => {
    const keys = getPluralsExcluding(pluralsToExclude);

    return keys.map((key) => ({
      label: getPluralName(key),
      value: key,
    }));
  }, [pluralsToExclude]);

  const handleChange = (newValue: SingleValue<SelectOption>) => {
    onChange(newValue?.value ?? null);
  };

  const selectValue = useMemo(
    () => options.find((c) => c.value === value),
    [options, value],
  );

  return (
    <Select
      value={selectValue ?? null}
      onChange={handleChange as never}
      options={options}
      classNames={{
        control: () => "input input-bordered w-full max-w-xs !cursor-pointer",
        menuList: () =>
          "bg-base-100 max-w-xs border-l border-zinc-200 shadow-lg",
        placeholder: () => "text-base-content",
      }}
      unstyled
      placeholder="Select plural type..."
      components={{
        Option: CustomOption as never,
        SingleValue: CustomSingleValue as never,
      }}
    />
  );
};

export default PluralSelector;
