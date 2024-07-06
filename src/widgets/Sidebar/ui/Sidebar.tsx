import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, Button, ButtonSize } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import styles from './Sidebar.module.css';

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(styles.sidebar, { [styles.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        onClick={handleToggle}
        square
        size={ButtonSize.L}
        className={styles.button}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <ul className={styles.links}>
        <li>
          <AppLink to={RoutesPath.main} >
            <MainIcon className={styles.icon} />
            <span>{t('MainPage')}</span>
          </AppLink>
        </li>
        <li>
          <AppLink to={RoutesPath.about}>
            <AboutIcon className={styles.icon} />
            <span>{t('AboutPage')}</span>
          </AppLink>
        </li>
      </ul>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher collapsed={collapsed} />
      </div>
    </div>
  );
};
