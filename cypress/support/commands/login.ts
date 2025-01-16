import { LocalStorageKeys } from '../../../src/shared/constants';
import type { User } from '../../../src/entities/User'

export const login = (username: string = "testuser", password: string = "123") => {
  return cy.request({
    method: "POST",
    url: `http://localhost:8000/login`,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(body));
    return body
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>;
    }
  }
}
