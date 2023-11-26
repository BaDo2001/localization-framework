import { useRouter } from 'next/router';
import { WithTranslation, withTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

interface MyComponentProps extends WithTranslation {}

const Footer: React.FC<MyComponentProps> = ({ t }) => {
  const router = useRouter();

  const languageSelected = (event: any) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <footer>
        <select
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
      </footer>
    </>
  );
};

export default withTranslation('footer')(Footer);
