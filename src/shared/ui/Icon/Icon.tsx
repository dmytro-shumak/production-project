import { memo, type FunctionComponent, type SVGAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Icon.module.css";

interface Props {
  className?: string;
  Svg: FunctionComponent<SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

export const Icon = memo(({ className, Svg, inverted }: Props) => {
  return (
    <Svg
      className={classNames(inverted ? styles.inverted : styles.icon, {}, [
        className,
      ])}
    />
  );
});
