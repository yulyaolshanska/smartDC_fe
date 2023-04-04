import { InputGroup, Title } from 'components/RegistrationForm2/style';
import { useTranslation } from 'react-i18next';

export const TitleComponent = () => {
  const { t } = useTranslation();
  return (
    <InputGroup>
      <Title>{t('RegForm2.title')}</Title>
      <span>{t('RegForm2.remark')}</span>
      <span>{t('RegForm2.remark2')}</span>
    </InputGroup>
  );
};
