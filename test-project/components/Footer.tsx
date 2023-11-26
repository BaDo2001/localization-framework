import { WithTranslation, withTranslation } from 'next-i18next';

interface MyComponentProps extends WithTranslation {}

const Footer: React.FC<MyComponentProps> = ({ t }) => {
  return <footer></footer>;
};

export default withTranslation('footer')(Footer);
