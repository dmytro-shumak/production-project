import { memo, useState } from "react";
import { classNames } from "@/shared/lib";
import styles from "./StarRating.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";
import StarIcon from "@/shared/assets/icons/star.svg?react";

interface Props {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }: Props) => {
    const [hoveredStars, setHoveredStars] = useState<number>(0);

    const handleMouseEnter = (starsCount: number) => () => {
      setHoveredStars(starsCount);
    };

    const handleMouseLeave = () => {
      setHoveredStars(0);
    };

    return (
      <div className={classNames("", {}, [className])}>
        {stars.map((starNumber) => (
          <Icon
            Svg={StarIcon}
            key={starNumber}
            onMouseEnter={handleMouseEnter(starNumber)}
            onMouseLeave={handleMouseLeave}
            className={classNames(styles.starIcon, {
              [styles.active]: hoveredStars >= starNumber,
            })}
            width={size}
            height={size}
          />
        ))}
      </div>
    );
  },
);
