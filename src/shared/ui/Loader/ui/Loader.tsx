import type { FC } from "react";
import LoaderIcon from "@/shared/assets/icons/loader.svg?react";
import { classNames } from "@/shared/lib";
import styles from "./Loader.module.css";

interface Props {
  className?: string;
}

export const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles.pageLoader, {}, [className])}>
      <LoaderIcon />
    </div>
  );
};
