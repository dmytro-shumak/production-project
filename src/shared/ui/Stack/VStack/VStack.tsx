import { Flex, type FlexProps } from "../Flex/Flex";

type Props = Omit<FlexProps, "direction">;

export const VStack = (props: Props) => {
  return <Flex {...props} direction="column" />;
};
