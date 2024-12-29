import { memo, useState } from "react";

import { Icon } from "../Icon/Icon";

import styles from "./StarRating.module.css";

import StarIcon from "@/shared/assets/icons/star.svg?react";
import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

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
      <div className={classNames("", {}, [className])}>
        {stars.map((starNumber) => (
          <Icon
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
          />
        ))}
      </div>
    );
  },
);
