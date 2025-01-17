describe('Article list page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles')
    })
  })
  it('Load articles', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleItem').should('have.length.greaterThan', 3)
  })
  it('Search articles', () => {
    let currentArticleId= '';
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.getByTestId('ArticleSearchInput').type('Testing article');
      cy.getByTestId('ArticleItem').should('have.length.greaterThan', 0);
      cy.removeArticle(currentArticleId);
    });
  })
})