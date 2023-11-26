import Link from 'next/link';
import { useRouter } from 'next/router';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

type Props = {
  // Add custom props here
};

const Homepage = (props: Props) => {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  };

  const changeTo = router.locale === 'en' ? 'hu' : 'en';
  // const changeTo = i18n.resolvedLanguage === 'en' ? 'hu' : 'en'

  return (
    <>
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
          <Link href="/" locale={changeTo}>
            <button>{t('changeLanguage', { changeTo })}</button>
          </Link>
        </div>
      </main>
    </>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'en',
      ['common'],
      nextI18NextConfig
    )),
  },
});

export default Homepage;
