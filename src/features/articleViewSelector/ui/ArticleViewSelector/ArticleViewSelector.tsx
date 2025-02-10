import { memo } from "react";

import styles from "./ArticleViewSelector.module.css";

import { ArticleView } from "@/entities/Article";
import GridIcon from "@/shared/assets/icons/grid-new.svg?react";
import GridIconDeprecated from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list-new.svg?react";
import ListIconDeprecated from "@/shared/assets/icons/list.svg?react";
import { classNames } from "@/shared/lib";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDeprecated,
  ButtonTheme,
  Icon as IconDeprecated,
} from "@/shared/ui";
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
    icon: toggleFeatures({
      name: "isAppRedesigned",
      on: () => GridIcon,
      off: () => GridIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: "isAppRedesigned",
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: Props) => {
    const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

    return (
      <ToggleFeatures
        featureName="isAppRedesigned"
        on={
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
                Svg={viewType.icon}
                className={classNames("", {
                  [styles.notSelected]: view !== viewType.view,
                })}
              />
            ))}
          </Card>
        }
        off={
          <div className={classNames("", {}, [className])}>
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                theme={ButtonTheme.Clear}
                onClick={onClick(viewType.view)}
                key={viewType.view}
              >
                <IconDeprecated
                  Svg={viewType.icon}
                  className={classNames("", {
                    [styles.notSelected]: view !== viewType.view,
                  })}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    );
  },
);
