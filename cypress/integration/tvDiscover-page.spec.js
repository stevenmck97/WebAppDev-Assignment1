/* eslint-disable no-undef */
let tvShows;    // List of tv shows from TMDB

// Utility functions
const filterByName = (tvList, string) =>
    tvList.filter((m) => m.name.toLowerCase().search(string) !== -1);

const filterByGenre = (tvList, genreId) =>
    tvList.filter((m) => m.genre_ids.includes(genreId));


describe("Discover TV Page ", () => {
    before(() => {
        // Get tv shows from TMDB and store in tvShows variable.
        cy.request(
            `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")    // Take the body of HTTP response from TMDB
            .then((response) => {
                tvShows = response.results
            })
    })
    beforeEach(() => {
        cy.visit("/")
        cy.wait(2000);
        cy.get("button").contains("TV Shows").get("#dropdown-basic2").click().get(".dropdown-item").contains("Discover TV Shows").click();
        cy.wait(2000);
    });

    describe("Base test", () => {
        it("displays page header", () => {
            cy.wait(2000);
            cy.get("h2").contains("Discover Tv Shows");
            cy.wait(2000);
            cy.get(".badge").contains(20);
        });

        describe("Filtering", () => {
            describe("By tv show title", () => {
                it("should display tv shows with 'p ' in the title", () => {
                    const searchString = 'p'
                    const matchingTvShows = filterByName(tvShows, searchString);
                    cy.get("input").clear().type(searchString);
                    cy.get(".card").should("have.length", matchingTvShows.length);
                    cy.get(".card").each(($card, index) => {
                        cy.wrap($card)
                            .find(".card-title")
                            .should("have.text", matchingTvShows[index].name);
                    });
                })
                it("should display tv shows with 'o' in the title", () => {
                    const searchString = "o";
                    const matchingTvShows = filterByName(tvShows, searchString);
                    cy.get("input").clear().type(searchString);
                    cy.get(".card").should("have.length", matchingTvShows.length);
                    cy.get(".card").each(($card, index) => {
                        cy.wrap($card)
                            .find(".card-title")
                            .should("have.text", matchingTvShows[index].name);
                    })
                })
                it("should display tv shows with 'xyz' in the title", () => {
                    const searchString = "xyz";
                    const matchingTvShows = filterByName(tvShows, searchString);
                    cy.get("input").clear().type(searchString);
                    cy.get(".card").should("have.length", matchingTvShows.length);
                    cy.get(".card").should('not.exist')
                })
            })
            describe("By tv show genre", () => {
                it("should display tv shows with the specified genre only", () => {
                    const selectedGenreId = 35;
                    const selectedGenreText = "Comedy";
                    const matchingTvShows = filterByGenre(tvShows, selectedGenreId);
                    cy.get("select").select(selectedGenreText);
                    cy.get(".card").should("have.length", matchingTvShows.length);
                    cy.get(".card").each(($card, index) => {
                        cy.wrap($card)
                            .find(".card-title")
                            .should("have.text", matchingTvShows[index].name);
                    });
                });
                it("should display tv shows with the specified genre and name", () => {
                    const searchString = "o";
                    const selectedGenreId = 35;
                    const selectedGenreText = "Comedy";
                    const matchingGenres = filterByGenre(tvShows, selectedGenreId);
                    const matchingTvShows = filterByName(matchingGenres, searchString)
                    cy.get("input").clear().type(searchString);
                    cy.get("select").select(selectedGenreText);
                    cy.get(".card").should("have.length", matchingTvShows.length);
                    cy.get(".card").each(($card, index) => {
                        cy.wrap($card)
                            .find(".card-title")
                            .should("have.text", matchingTvShows[index].name);
                    });
                });
            });

            describe("Adding tv show to favourites", () => {
                it("should add 3 cards to favorite tv shows", () => {
                    cy.get(".card").eq(0).get("button").contains("Add to Favorites").click();
                    cy.get(".card").eq(1).get("button").contains("Add to Favorites").click();
                    cy.get(".card").eq(2).get("button").contains("Add to Favorites").click();
                    cy.get("button").contains("TV Shows").get("#dropdown-basic2").click().get(".dropdown-item").contains("Favorite TV Shows").click();
                    cy.get(".badge").contains(3);
                });
            });
        });
    });
});


