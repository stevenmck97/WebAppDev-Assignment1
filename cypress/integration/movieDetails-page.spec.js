/* eslint-disable no-undef */
let movieId = null
let movie;
// eslint-disable-next-line no-unused-vars
let reviews;
describe("Movie Details Page", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                return response.results[2].id;
            })
            .then((arbitraryMovieIdignored) => {
                movieId = arbitraryMovieIdignored
                return cy
                    .request(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Cypress.env(
                            "TMDB_KEY"
                        )}`
                    )
                    .its("body");
            })
            .then((movieDetails) => {
                movie = movieDetails;
                return movieDetails.id;
            })
    });
    beforeEach(() => {
        cy.visit(`/`);
        cy.get(".card").eq(2).find("img").click();
        cy.wait(2000);
      });

    it("should display movie title in the page header", () => {
        cy.get("h2").contains(movie.title);
    });

    it("should display the movie's details", () => {
        cy.get("h4").contains("Overview");
        cy.get("h4").next().contains(movie.overview);
        cy.get("ul")
            .eq(1)
            .within(() => {
                cy.get("li").eq(0).contains("Runtime");
                cy.get("li").eq(1).contains(movie.runtime);
                cy.get("li").eq(2).contains("Release Date");
                cy.get("li").eq(3).contains(movie.release_date);
                // cy.get("li").each(($li, movie) => {
                //     cy.wrap($li)
                //         .find("Genres")
                //         .should("have.text", movie.genre);
                // });
            });
    });
    it("should display the Home icon with the correct URL value", () => {
        cy.get(".fa-home")
            .parent()
            .should("have.attr", "href")
            .should("include", movie.homepage);
    });
    it("should display a movie poster on the page", () => {
        cy.get("img").should('be.visible');
    });
});