import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui';
import styles from './PageError.module.css';

interface Props {
  className?: string;
}

export const PageError: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <p>{t('UnexpectedErrorOccurred')}</p>
      <Button onClick={reloadPage} theme={ButtonTheme.Primary}>
        {t('ReloadPage')}
      </Button>
    </div>
  );
};
