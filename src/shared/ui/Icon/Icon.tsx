import { memo, type FunctionComponent, type SVGAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Icon.module.css";

interface Props {
  className?: string;
  Svg: FunctionComponent<SVGAttributes<SVGElement>>;
}

export const Icon = memo(({ className, Svg }: Props) => {
  return <Svg className={classNames(styles.icon, {}, [className])} />;
});
