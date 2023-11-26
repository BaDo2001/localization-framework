import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SecondPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main>
        <h1>{t('title')}</h1>
        <hr />
        <div>
          <p>
            {t('username')} <input type="text" name="username" id="username" />
          </p>
          <p>
            {t('password')}{' '}
            <input type="password" name="password" id="password" />
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default SecondPage;
