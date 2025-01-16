let currentArticleId: string;

describe("Article details page", () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.log(JSON.stringify(article))
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it("Load article", () => {
    cy.getByTestId("ArticleDetails").should("exist");
  });
});
