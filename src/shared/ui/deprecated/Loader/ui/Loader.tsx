import type { FC } from "react";

import styles from "./Loader.module.css";

import LoaderIcon from "@/shared/assets/icons/loader.svg?react";
import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles.pageLoader, {}, [className])}>
      <LoaderIcon />
    </div>
  );
};
