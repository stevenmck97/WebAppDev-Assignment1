# Assignment 1 - ReactJS app.

Name: Steven McKeown

## Features.

+ Feature 1 - Added an upcoming movies page which also allows you to click on it to see movie details, also allowing you to show reviews (if any) and view the full review. You can write a review but it does not display. Can also add an upcoming movie to a Watch List which can be viewed in the Movie Watch List Page.
+ Feature 2 - Added 5 new TV tmdb endpoints and 1 discover tv endpoint. All are accompanied by their associated pages to work with each other. The Discover tv page allows you to add to favorites which can be viewed in the Favorite Tv shows page. The Airing tv show page and Top Rated tv show page allow you to add tv shows to your watch list which can be viewed on the tv watch list page. You can also show reviews, open full reviews, and write your own reviews. When writing the review it does not however display.
+ Feature 3 - Added a popular actors page which makes use of the person/popular endpoint. Can add to favorites. Can also click to view person details. 
+ Feature 4 - Implemented a react bootstrap dropdown menu to replace to default navbar menu.

## Setup requirements (If required).
npm install react-bootstrap bootstrap

## API Data Model.

+ https://api.themoviedb.org/3/movie/upcoming - get a list of upcoming movies
+ https://api.themoviedb.org/3/discover/tv - get a list of tv shows on the discover tv page
+ https://api.themoviedb.org/3/tv/${id} - get detailed information on a specific tv series
+ https://api.themoviedb.org/3/tv/on_the_air - get a list of tv shows currently airing
+ https://api.themoviedb.org/3/genre/tv/list - get a list of tv genres
+ https://api.themoviedb.org/3/tv/${id}/reviews - get reviews for a specific tv show
+ https://api.themoviedb.org/3/tv/top_rated - get a list of top rated tv shows
+ https://api.themoviedb.org/3/person/${id} - get detailed information on a specific person
+ https://api.themoviedb.org/3/person/popular - get a list of popular people 


## App Design

### Component catalogue (If required).

![][stories]

### UI Design.

![][upcomingMoviesList]
>Shows a list of upcoming movies. Clicking the 'Add to Watch List' button will add it to the watch list.

![][moviesWatchList]
>Shows a list of upcoming movies added to the watch list by the user. 

![][tvDiscoverList]
>Shows a list of TV shows to be discovered. Clicking on any of the images will display a new page with TV show details. Clicking the 'Add to Favorites' button will add it to the TV favorite's page.

![][tvFavorites]
>Shows a list of TV shows added from the Discover TV shows page.

![][tvTopRatedList]
>Shows a list of Top Rated TV Shows. Clicking on any of the images will display a new page with TV show details. Clicking the 'Add to Watch List' button will not add it to the watch list page because of a bug.

![][tvAiringList]
>Shows a list of TV shows to be discovered. Clicking on any of the images will display a new page with TV show details. Clicking the 'Add to Watch List' button will add it to the TV watch list page.

![][tvWatchList]
>Shows a list of Airing moivies added to the tv watch list by the user.

![][tvReviewsForm]
>Shows a TV Reviews form. Validated to stop you from submitting the review if the description is less than 10 characters. Does not display once added.

![][tvDetails]
>Shows detailed information on a TV Show. Clicking the 'Show Reviews' button will display extracts from critic reviews.

![][tvReviews]
>Shows a list of reviews. Clicking the 'Full Review' button will show the review in full.

![][tvFullReview]
>Shows the full review.

![][personPopularList]
>Shows a list of popular people. Clicking the 'Add to Favorites' button will add it to the Favorite Actors page.

![][personFavorites]
>Shows a list of popular people added from the popular people page. Clicking the 'Add to Favorites' button here will not do anything.

![][personDetails]
>Shows detailed information on a TV Show.

## Routing.

+ /tvReviews/form - displays a tv reviews form
+ /movies/upcoming - displays upcoming movies 
+ /movies/watchList - displays movies added from the upcoming page
+ /tv/favorites - dispays a user's favourite tv series (added from the discover tv page)
+ /tv/watchList - displays a user's tv show watch list. Can only be added from Airing tv shows page
+ /tv/airing - displays currently airing tv shows
+ /tv/topRated - displays top rated tv shows
+ /tv/discover - displays discover tv shows
+ /person/popular - displays popular people
+ /person/favorites - displays a user's favorite people 
+ /tvReviews/:id - displays the full text of a tv review
+ /tv/:id - displays tv details
+ /person/:id - displays person details

### Data hyperlinking.

![][cardLink]
> Clicking a card causes the display of that movie's details.

![][reviewLink]
>Clicking the 'Full Review' for a review extract will display the full text of the review

## Independent learning (If relevant).
Implemented a react bootstrap dropdown menu to replace to default navbar menu.

![][dropdownMenu]

https://react-bootstrap.github.io/components/dropdowns/


---------------------------------

# Assignment 1 - Agile Software Practice.

Name: ... your name ...

## App Features.

[Document each new feature/page in your Movies Fan app, including: Feature Name; Its objective/purpose; The associated test file; a screenshot of its UI.]
e,g,
 
+ Movie Details page - Shows the details about a movie. The Show reviews button reveals an excerpt for each critic review of the movie.

Tests: cypress/integration/movieDetails.spec.js 

![][movieDetail]

+ Movie Review page: Displays the full text of a movie review.

Tests: cypress/integration/movieReviewPage.spec.js 

![][review]

+ etc

+ etc

## Testing.

Cypress Dashboard URL: ... your project's dashboard URL .....

### Advanced Testing (If required).

[State briefly each instances of boundary and/or error/exceptional test case in your project]
e.g.

+ cypress/integration/movieReviewPage.spec.js - test the movieReview page when the Review id is invalid. 
+ cypress/integration/movieDetails.spec.js - test when a movie has no reviews.
+ etc

## Independent learning (If relevant).

[ Itemize each technologies/techniques used in your project that were not covered in the lectures/labs. Provide the necessary evidence of their use (e,g, project file names, screenshots, service URL, etc)

List reference material links (articles/blogs).

---------------------------------
[upcomingMoviesList]: ./public/upcomingMoviesList.png
[moviesWatchList]: ./public/moviesWatchListl.png
[tvDiscoverList]: ./public/tvDiscoverList.png
[tvFavorites]: ./public/tvFavorites.png
[tvTopRatedList]: ./public/tvTopRatedList.png
[tvAiringList]: ./public/tvAiringList.png
[tvWatchList]: ./public/tvWatchList.png
[tvReviewsForm]: ./public/tvReviewsForm.png
[tvDetails]: ./public/tvDetails.png
[tvReviews]: ./public/tvReviews.png
[tvFullReview]: ./public/tvFullReview.png
[personPopularList]: ./public/personPopularList.png
[personFavorites]: ./public/personFavorites.png
[personDetails]: ./public/personDetails.png
