import { ProfileCard, type Profile } from "../../src/entities/Profile";
import { TestProvider } from "../../src/shared/lib/tests";

const profileData = {
  id: "3",
  firstName: "testuser",
  lastName: "Lesn",
  age: 28,
  currency: "UAH",
  country: "Ukraine",
  city: "Los Angeles",
  username: "testuser",
  avatar: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
} as Profile;

describe('ProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.mount(
    <TestProvider>
      <ProfileCard data={profileData}/>
    </TestProvider>
    )
  })
})