import { Flex, type FlexProps } from "../Flex/Flex";

type Props = Omit<FlexProps, "direction">;

export const VStack = ({ align = "start", ...restProps }: Props) => {
  return <Flex {...restProps} align={align} direction="column" />;
};
