import { memo, useState } from "react";

import { Icon } from "../../redesigned/Icon";
import { Icon as IconDeprecated } from "../Icon/Icon";

import styles from "./StarRating.module.css";

import StarIcon from "@/shared/assets/icons/star.svg?react";
import { classNames } from "@/shared/lib";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";

interface Props {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const StarRating = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }: Props) => {
    const [hoveredStars, setHoveredStars] = useState<number>(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const handleMouseEnter = (starsCount: number) => () => {
      if (!isSelected) {
        setHoveredStars(starsCount);
      }
    };

    const handleMouseLeave = () => {
      if (!isSelected) {
        setHoveredStars(0);
      }
    };

    const handleClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);
        setHoveredStars(starsCount);
        setIsSelected(true);
      }
    };

    return (
      <div
        className={classNames(
          toggleFeatures({
            name: "isAppRedesigned",
            on: () => styles.starRatingRedesigned,
            off: () => "",
          }),
          {},
          [className],
        )}
      >
        {stars.map((starNumber) => (
          <ToggleFeatures
            featureName="isAppRedesigned"
            on={
              <Icon
                clickable={!isSelected}
                Svg={StarIcon}
                onClick={handleClick(starNumber)}
                key={starNumber}
                onMouseEnter={handleMouseEnter(starNumber)}
                onMouseLeave={handleMouseLeave}
                className={classNames(styles.starIcon, {
                  [styles.active]: hoveredStars >= starNumber,
                  [styles.selected]: isSelected,
                })}
                width={size}
                height={size}
                data-testid={`StarRating.${starNumber}`}
                data-selected={selectedStars >= starNumber}
              />
            }
            off={
              <IconDeprecated
                Svg={StarIcon}
                onClick={handleClick(starNumber)}
                key={starNumber}
                onMouseEnter={handleMouseEnter(starNumber)}
                onMouseLeave={handleMouseLeave}
                className={classNames(styles.starIcon, {
                  [styles.active]: hoveredStars >= starNumber,
                  [styles.selected]: isSelected,
                })}
                width={size}
                height={size}
                data-testid={`StarRating.${starNumber}`}
                data-selected={selectedStars >= starNumber}
              />
            }
          />
        ))}
      </div>
    );
  },
);
