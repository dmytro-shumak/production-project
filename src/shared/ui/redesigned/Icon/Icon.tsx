import {
  memo,
  type ButtonHTMLAttributes,
  type FunctionComponent,
  type SVGAttributes,
} from "react";

import styles from "./Icon.module.css";

import { classNames } from "@/shared/lib";
import type { DataAttributes } from "@/shared/types";

type SvgProps = Omit<SVGAttributes<SVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: FunctionComponent<SVGAttributes<SVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & DataAttributes;
}

type Props = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: Props) => {
  const {
    className,
    Svg,
    clickable,
    width = 32,
    height = 32,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(styles.icon, {}, [className])}
      width={32}
      height={32}
      {...otherProps}
      onClick={undefined}
    />
  );
  if (clickable) {
    return (
      <button
        onClick={props.onClick}
        type="button"
        className={styles.button}
        style={{ height, width }}
        {...props.buttonProps}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
