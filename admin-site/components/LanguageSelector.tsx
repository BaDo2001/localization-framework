"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { OptionProps, SingleValue, SingleValueProps } from "react-select";
import Select from "react-select";

import clsx from "clsx";
import Image from "next/image";

import type { LocaleKey } from "@/lib/locales";
import { locales } from "@/lib/locales";

type SelectOption = {
  value: string;
  label: string;
  flag: string;
};

type Props = {
  value: string | null | string[];
  onChange: (value: string | null | string[]) => void;
  keysToExclude?: string[];
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
    <Image
      src={data.flag}
      alt={data.label}
      width={32}
      height={32}
      style={{
        width: "auto",
        height: "100%",
      }}
    />

    <span>{data.label}</span>
  </div>
);

type CustomSingleValueProps = SingleValueProps<SelectOption>;

const CustomSingleValue: FC<CustomSingleValueProps> = ({ data }) => (
  <div className="flex items-center gap-4 absolute inset-0 ml-2">
    <Image
      src={data.flag}
      alt={data.label}
      width={32}
      height={32}
      style={{
        width: "auto",
        height: "100%",
      }}
    />
    <span className="h-full">{data.label}</span>
  </div>
);

const LanguageSelector: FC<Props> = ({
  value,
  onChange,
  keysToExclude = [],
}) => {
  const options: SelectOption[] = useMemo(() => {
    const keys = Object.keys(locales) as LocaleKey[];

    return keys
      .filter((key) => !keysToExclude.includes(key))
      .map((key) => ({
        value: key,
        label: locales[key].name,
        flag: locales[key].flag,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [keysToExclude]);

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
        menuList: () => "bg-base-100 max-w-xs border-l border-zinc-200",
        placeholder: () => "text-base-content",
      }}
      unstyled
      placeholder="Select language..."
      components={{
        Option: CustomOption as never,
        SingleValue: CustomSingleValue as never,
      }}
    />
  );
};

export default LanguageSelector;
