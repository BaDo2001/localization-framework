import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import nextI18NextConfig from '../next-i18next.config.js';

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation('header');

  const languageSelected = (event: any) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="navbar bg-base-300 shadow-lg">
      <div className="navbar-start"></div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" locale={router.locale}>
              {t('header:home')}
            </Link>
          </li>
          <li>
            <Link href="/second-page" locale={router.locale}>
              {t('header:secondPage')}
            </Link>
          </li>
          <li>
            <Link href="/third-page" locale={router.locale}>
              {t('header:thirdPage')}
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <select
          className="select"
          onChange={languageSelected}
          value={router.locale}
          name="languages"
          id="languages"
        >
          {nextI18NextConfig.i18n.locales.map((locale: string) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
