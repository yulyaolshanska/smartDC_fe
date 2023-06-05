import { LoadButton } from './styles';
import { useTranslation } from 'react-i18next';

//not reusable

interface LoadMoreButtonProps {
  setFetchAll: (arg: boolean) => void;
  disabled: boolean;
}

const LoadMoreButton = ({ setFetchAll, disabled }: LoadMoreButtonProps) => {
  const { t } = useTranslation();

  return (
    <LoadButton onClick={() => setFetchAll(true)} disabled={disabled}>
      {t('Dashboard.LoadMore')}
    </LoadButton>
  );
};

export default LoadMoreButton;
