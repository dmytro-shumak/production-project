import { Flex, type FlexProps } from "../Flex/Flex";

type Props = Omit<FlexProps, "direction">;

export const VStack = ({ align = "stretch", ...restProps }: Props) => {
  return <Flex {...restProps} align={align} direction="column" />;
};
