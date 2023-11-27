import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';

const SecondPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'secondPage']);

  return (
    <>
      <Header />
      <main className="container pt-10 mx-auto">
        <article className="max-w-6xl rounded-2xl shadow-lg p-10 mx-auto ">
          <h1 className="text-3xl font-bold">{t('secondPage:title')}</h1>
          <div className="divider divider-neutral"></div>
          <div className="flex-col space-y-3">
            <div className="overflow-x-auto"></div>
          </div>
        </article>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'header',
      'common',
      'secondPage',
    ])),
  },
});

export default SecondPage;
