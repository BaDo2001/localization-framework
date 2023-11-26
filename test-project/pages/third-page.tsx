import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ThirdPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['thirdPage']);

  return (
    <>
      <Header />
      <main className="container pt-10 mx-auto">
        <article className="max-w-6xl rounded-2xl shadow-lg p-10 mx-auto ">
          <h1 className="text-3xl font-bold">{t('thirdPage:title')}</h1>
          <div className="divider divider-neutral"></div>
          <div className="flex-col space-y-3"></div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'header',
      'common',
      'thirdPage',
    ])),
  },
});

export default ThirdPage;
