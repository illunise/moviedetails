const searchForm = document.querySelector(".search-container form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

const getMovieInfo = async (movie) => {
  try {
    const MyApiKey = "fdce139e";
    const url = `https://www.omdbapi.com/?apikey=${MyApiKey}&t=${movie}`;

    const response = await fetch(url); //promise
    if (!response.ok) {
      throw new error("Unable to fetch movie data");
    }
    const data = await response.json();
    showMovieData(data);
  } catch (error) {
    showErrorMessage("No movie found!!!");
    console.log(error);
  }
};
//functionto show movie data on screen
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");
  //using destructuring to extract props from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");

  movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strongRating:&#11088;</strong>${imdbRating}</p>`;

  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  //using + so that the upper data doesnt get removed (overwrite)

  movieElement.innerHTML += `<p><strong>Released Date</strong>${Released}</p>
  <p><strong>Duration:</strong>${Runtime}</p>
  <p><strong>Cast:</strong>${Actors}</p>
  <p><strong>Plot:</strong>${Plot}</p>
  `;
  //creating movie poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `<img src="${Poster}" />`;
  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
};
//function to display error message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
};
//function to handle form submission
const handleFormSubmission = (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMessage("Fetching Movie Information");
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get movie information");
  }
};
//adding event listener to search form
searchForm.addEventListener("submit", handleFormSubmission);
