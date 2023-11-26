import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
            <div></div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>{t('common:code')}</th>
                    <th>{t('common:result')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {"t('secondPage:place', { count: 1, ordinal: true })"}
                    </td>
                    <td>
                      {t('secondPage:place', { count: 1, ordinal: true })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"t('secondPage:place', { count: 21, ordinal: true })"}
                    </td>
                    <td>
                      {t('secondPage:place', { count: 21, ordinal: true })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"t('secondPage:place', { count: 2, ordinal: true })"}
                    </td>
                    <td>
                      {t('secondPage:place', { count: 2, ordinal: true })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"t('secondPage:place', { count: 11, ordinal: true })"}
                    </td>
                    <td>
                      {t('secondPage:place', { count: 11, ordinal: true })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"t('secondPage:place', { count: 32, ordinal: true })"}
                    </td>
                    <td>
                      {t('secondPage:place', { count: 32, ordinal: true })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
      'secondPage',
    ])),
  },
});

export default SecondPage;
