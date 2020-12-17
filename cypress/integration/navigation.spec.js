/* eslint-disable no-undef */
let movies;
const movieId = 497582; // Enola Holmes movie id
let reviews;

describe("Navigation", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
        cy.request(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
                "TMDB_KEY"
            )}`
        )
            .its("body")
            .then((response) => {
                console.log(response);
                reviews = response.results;
            });
    });

    describe("From the home page", () => {
        beforeEach(() => {
            cy.visit("/");
            cy.wait(300)
        });
        it("should navigate to the movie details page and change browser URL", () => {
            cy.get(".card").eq(1).find("img").click();
            cy.wait(300)
            cy.url().should("include", `/movies/${movies[1].id}`);
            cy.wait(300)
            cy.get("h2").contains(movies[1].title);
        });
        it("should allow navigation from site header to movie dropdown pages", () => {
            cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Favorite Movies").click();
            cy.url().should("include", `/favorites`);
            cy.wait(300)
            cy.get("h2").contains("Favorite Movies");

            cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Upcoming Movies").click();
            cy.url().should("include", `/upcoming`);
            cy.wait(300)
            cy.get("h2").contains("Upcoming Movies");

            cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Watchlist Movies").click();
            cy.url().should("include", `/watchList`);
            cy.wait(300)
            cy.get("h2").contains("Movies Watch List");

            cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Discover Movies").click();
            cy.url().should("include", `/`);
            cy.wait(300)
            cy.get("h2").contains("Discover Movies");
        });
        describe("From the Movie Details page ", () => {
            beforeEach(() => {
                cy.visit(`/movies/${movieId}`);
            });
            it("should change browser URL when show/hide reviews is clicked", () => {
                cy.contains("Show Reviews").click();
                cy.url().should("include", `/movies/${movieId}/reviews`);
                cy.contains("Hide Reviews").click();
                cy.url().should("not.include", `/movies/${movieId}/reviews`);
            });
            it("navigate to the full review page when a 'Full Review' link is clicked", () => {
                cy.contains("Show Reviews").click();
                cy.url().should("include", `/movies/${movieId}/reviews`);
                cy.get("tbody").find("a").eq(0).click();
                cy.url().should("include", `/reviews`);
            });
        });
        describe("From the Favorites page", () => {
            beforeEach(() => {
                cy.visit("/");
                cy.wait(300);
                cy.get(".card").eq(0).find("button").click();
                cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Favorite Movies").click();
            });
            it("should navigate to the movies detail page and change the browser URL", () => {
                cy.get(".card").eq(0).find("img").click();
                cy.wait(300);
                cy.url().should("include", `/movies/${movies[0].id}`);
                cy.wait(300);
                cy.get("h2").contains(movies[0].title);
            });
        });

        describe("The Go Back button", () => {
            beforeEach(() => {
                cy.visit("/");
                cy.wait(300);
            });
            it("should navigate from home page to movie details and back", () => {
                cy.get(".card").eq(1).find("img").click();
                cy.wait(300);
                cy.get("svg[data-icon=arrow-circle-left]").click();
                cy.url().should("not.include", `/movies`);
                cy.wait(300);
                cy.get("h2").contains("Discover Movies");
            });
            it("should navigate from favorites page to movie details and back", () => {
                cy.get(".card").eq(0).find("button").click();
                cy.wait(300);
                cy.get("button").contains("Movies").get("#dropdown-basic").click().get(".dropdown-item").contains("Favorite Movies").click();
                cy.wait(300);
                cy.get(".card").eq(0).find("img").click();
                cy.get("svg[data-icon=arrow-circle-left]").click();
                cy.url().should("include", `/movies/favorites`);
                cy.wait(300);
                cy.get("h2").contains("Favorite Movies");
            });
        });
    });

});


