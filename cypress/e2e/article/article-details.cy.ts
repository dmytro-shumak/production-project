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
  it("Load recommendation list", () => {
    cy.getByTestId("ArticleRecommendationsList").should("exist");
  });
  it("Send a comment", () => {
    cy.getByTestId("ArticleDetails");
    cy.getByTestId("AddCommentForm").scrollIntoView()
    cy.addComment('text');
    cy.getByTestId('CommentItem').should('have.length', 1)
  });
  it("Rate article", () => {
    cy.getByTestId("ArticleDetails");
    cy.getByTestId("RatingCard").scrollIntoView()
    cy.setRating(5,'feedback');
    cy.get('[data-selected=true]').should('have.length', 5)
  });
});
