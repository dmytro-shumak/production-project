import { memo, type FunctionComponent, type SVGAttributes } from "react";

import styles from "./Icon.module.css";

import { classNames } from "@/shared/lib";

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
}

type Props = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: Props) => {
  const { className, Svg, clickable, ...otherProps } = props;

  const icon = (
    <Svg
      className={classNames(styles.icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    />
  );
  if (clickable) {
    return (
      <button onClick={props.onClick} type="button" className={styles.button}>
        {icon}
      </button>
    );
  }

  return icon;
});
