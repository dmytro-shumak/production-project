import { memo } from "react";
import GridIcon from "shared/assets/icons/grid.svg";
import ListIcon from "shared/assets/icons/list.svg";
import { classNames } from "shared/lib";
import { Button, ButtonTheme, Icon } from "shared/ui";
import { ArticleView } from "../../model/types/article";
import styles from "./ArticleViewSelector.module.css";

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
      <div className={classNames("", {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button
            theme={ButtonTheme.Clear}
            onClick={onClick(viewType.view)}
            key={viewType.view}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames("", {
                [styles.notSelected]: view !== viewType.view,
              })}
            />
          </Button>
        ))}
      </div>
    );
  },
);
