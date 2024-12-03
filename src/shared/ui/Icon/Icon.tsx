import {
  memo,
  type FunctionComponent,
  type SVGAttributes,
  type SVGProps,
} from "react";
import { classNames } from "@/shared/lib";
import styles from "./Icon.module.css";

interface Props extends SVGProps<SVGElement> {
  className?: string;
  Svg: FunctionComponent<SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

export const Icon = memo(
  ({ className, Svg, inverted, ...otherProps }: Props) => {
    return (
      <Svg
        className={classNames(inverted ? styles.inverted : styles.icon, {}, [
          className,
        ])}
        {...otherProps}
      />
    );
  },
);
