import { memo } from "react";

import styles from "./ArticleViewSelector.module.css";

import { ArticleView } from "@/entities/Article";
import GridIcon from "@/shared/assets/icons/grid-new.svg?react";
import ListIcon from "@/shared/assets/icons/list-new.svg?react";
import { classNames } from "@/shared/lib";
import { Card } from "@/shared/ui/redesigned/Card";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface Props {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: GridIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: Props) => {
    const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

    return (
      <Card
        className={classNames(styles.articleViewSelectorRedesigned, {}, [
          className,
        ])}
        borderRadius={42}
      >
        {viewTypes.map((viewType) => (
          <Icon
            clickable
            onClick={onClick(viewType.view)}
            key={viewType.view}
            Svg={viewType.icon}
            className={classNames("", {
              [styles.notSelected]: view !== viewType.view,
            })}
          />
        ))}
      </Card>
    );
  },
);
