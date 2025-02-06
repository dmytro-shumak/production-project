import { Flex, type FlexProps } from "../Flex/Flex";

type Props = Omit<FlexProps, "direction">;

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const HStack = (props: Props) => {
  return <Flex {...props} direction="row" />;
};
