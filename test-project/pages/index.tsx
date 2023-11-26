import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';

const Homepage = () => {
  const router = useRouter();
  const { t } = useTranslation(['index', 'common']);

  return (
    <>
      <Header />
      <main className="container pt-10 mx-auto">
        <article className="max-w-6xl rounded-2xl shadow-lg p-10 mx-auto ">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <div className="divider divider-neutral"></div>
          <div className="flex-col space-y-3">
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
                    <td>{"t('index:item', { count: 0 })"}</td>
                    <td>{t('index:item', { count: 0 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:item', { count: 1 })"}</td>
                    <td>{t('index:item', { count: 1 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:item', { count: 5 })"}</td>
                    <td>{t('index:item', { count: 5 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:item', { count: 100 })"}</td>
                    <td>{t('index:item', { count: 100 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:itemWithCount', { count: 0 })"}</td>
                    <td>{t('index:itemWithCount', { count: 0 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:itemWithCount', { count: 1 })"}</td>
                    <td>{t('index:itemWithCount', { count: 1 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:itemWithCount', { count: 5 })"}</td>
                    <td>{t('index:itemWithCount', { count: 5 })}</td>
                  </tr>
                  <tr>
                    <td>{"t('index:itemWithCount', { count: 100 })"}</td>
                    <td>{t('index:itemWithCount', { count: 100 })}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      'index',
    ])),
  },
});

export default Homepage;
