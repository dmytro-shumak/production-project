import {
  memo,
  useLayoutEffect,
  useState,
  type ImgHTMLAttributes,
  type ReactElement,
} from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const AppImage = memo(
  ({
    className,
    src,
    alt = "image",
    fallback,
    errorFallback,
    ...otherProps
  }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
      const img = new Image();
      img.src = src ?? "";
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [src]);

    if (isLoading && fallback) {
      return fallback;
    }

    if (hasError && errorFallback) {
      return errorFallback;
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />;
  },
);
