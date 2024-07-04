import { useState, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import styles from './Sidebar.module.css';

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
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
      <Button onClick={handleToggle} square size={ButtonSize.L} className={styles.button}>
        {collapsed ? '>' : '<'}
      </Button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher collapsed={collapsed}/>
      </div>
    </div>
  );
};
