
module.exports = (componentName) => `import { classNames } from "shared/lib";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import styles from "./${componentName}.module.css";

interface ${componentName}Props {
  className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(styles.${componentName}, {}, [className])}>${componentName}</div>;
});
`;
