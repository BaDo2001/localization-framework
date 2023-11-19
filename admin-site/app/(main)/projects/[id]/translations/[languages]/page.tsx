import { notFound } from "next/navigation";

import { getLocaleInfo } from "@/lib/locales";

type Props = {
  params: {
    // The languages in <source key>-<target key> format like hu-en
    languages: string;
  };
};

const TranslationPage = ({ params }: Props) => {
  const { languages } = params;

  if (!languages.match(/^[a-z]{2}-[a-z]{2}$/)) {
    return notFound();
  }

  const [source, target] = languages.split("-");

  return (
    <h1>
      Translate from {getLocaleInfo(source)?.name} to{" "}
      {getLocaleInfo(target)?.name}
    </h1>
  );
};

export default TranslationPage;
