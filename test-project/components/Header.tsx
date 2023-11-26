import { WithTranslation, withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface MyComponentProps extends WithTranslation {}

const Header: React.FC<MyComponentProps> = ({ t }) => {
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" locale={router.locale}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link href="/second-page" locale={router.locale}>
              {t('secondPage')}
            </Link>
          </li>
          <li>
            <Link href="/third-page" locale={router.locale}>
              {t('thirdPage')}
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default withTranslation('common')(Header);
