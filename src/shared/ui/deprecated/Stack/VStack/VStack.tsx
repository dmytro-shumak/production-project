import { type ElementType } from "react";

import { Flex, type FlexProps } from "../Flex/Flex";

// TODO: fix ts error when adding Omit
// type VStackProps<T extends ElementType = "div"> = FlexProps<T>;

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const VStack = <T extends ElementType = "div">(props: FlexProps<T>) => {
  const align = props?.align || "stretch";

  return <Flex {...props} align={align} direction="column" />;
};
