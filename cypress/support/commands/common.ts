import { selectByTestId } from "../../helpers/selectByTestId";

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId))