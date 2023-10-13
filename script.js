let allMovies = [];

//Define a movie class with parameters title (string), rating (number) and haveWatched (boolean)
class Movie {
    constructor(title, rating, haveWatched) {
        this.title = title;
        this.rating = rating;
        this.haveWatched = haveWatched;
    }

}

//add a movie OBJECT to the allMovies array
let addMovie = (movie) => {
    allMovies.push(movie);
    console.log("A new movie is added");

}

//iterate through all elements of allMovies array
//Display the total number of movies in allMovies array
let printMovies = () => {
    console.log("Printing all movies....");
    for (let i = 0; i < allMovies.length; i++) {
        console.log(allMovies[i].title + ", rating of " + allMovies[i].rating + ", havewatched: " + allMovies[i].haveWatched);
    }
    console.log("You have " + allMovies.length + " movies in total");

}


//Display only the movies that has a rating higher than rating(argument)
//Display the total number of matches
let highRatings = (rating) => {
    console.log("printing movie that has a rating higher than " + rating);
    let count = 0;
    for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].rating > rating) {
            console.log(allMovies[i].title + " has a rating of " + allMovies[i].rating);
            count++;
        }
    }
    console.log("In total, there are " + count + " matches");

}


//Toggle the 'haveWatched' property of the specified movie 
let changeWatched = (title) => {
    console.log("changing the status of the movie...");
    for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].title === title) {
            if (allMovies[i].haveWatched === true) {
                allMovies[i].haveWatched = false;
            } else {
                allMovies[i].haveWatched = true;
            }
        }
    }

}



////////////////////////////////////////////////////////////
//Test code - DO NOT DELETE
let x = new Movie("Spiderman", 3, true);
let y = new Movie("Citizen Kane", 4, false);
let z = new Movie("Zootopia", 4.5, true);

allMovies.push(x,y,z);

/*replace console.log with display on web page*/
console.log("----------------");
console.log("running program......");
console.log("----------------");
printMovies();


let movie1 = new Movie("Parasite", 2, false);

/*replace console.log with display on web page*/
console.log("----------------");
addMovie(movie1);
console.log("----------------");



changeWatched("Spiderman");
/*replace console.log with display on web page*/
console.log("----------------");

printMovies();

/*replace console.log with display on web page*/
console.log("----------------");

changeWatched("Spiderman");
/*replace console.log with display on web page*/
console.log("----------------");

printMovies();
/*replace console.log with display on web page*/
console.log("----------------");

highRatings(3.5);



// Add a movie when the form is submitted
document.getElementById('addMovieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    // Get form input values
    const title = document.getElementById('title').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const haveWatched = document.getElementById('haveWatched').checked;

  
    // Create a new movie object
    const newMovie = new Movie(title, rating, haveWatched);
  
    // Add the movie to the array
    addMovie(newMovie);
  
    // Update the display
    displayAllMovies();
    displayHighRatedMovies(3);
    this.reset(); // Clear the form
  });
  


// Function to display movie details, including images
function displayAllMovies() {
    allMovies.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
    
    const movieList = document.getElementById('movieList');
    const gridHeaders = document.querySelectorAll('.grid-header');
    movieList.innerHTML = ''; // Clear the existing list
  
    // Add grid headers
    gridHeaders.forEach(header => {
      movieList.appendChild(header);
    });
  
    allMovies.forEach(async (movie, index) => {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item'; // Apply CSS class for styling
  
      // Fetch movie details from the OMDB API
      const apiKey = '3d10646d'; // Replace with your API key
      const apiUrl = `https://www.omdbapi.com/?t=${movie.title}&apikey=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
         // Create an image element and set its src attribute
        const posterImage = document.createElement('img');
        posterImage.style.maxWidth = '100px'; // Adjust the desired width
        posterImage.style.maxHeight = '150px'; // Adjust the desired height

        // Set the source to the API poster image, or a default image if not available
        if (data.Poster && data.Poster !== 'N/A') {
         posterImage.src = data.Poster;
        } else {
        // Use your default image URL here
        posterImage.src = 'no-image.png';
        posterImage.style.maxWidth = '100px'; // Adjust the desired width
        posterImage.style.maxHeight = '150px'; // Adjust the desired height
         }

         // Handle image load errors
         posterImage.onerror = function () {
          // If the image fails to load, replace it with the default image
            posterImage.src = 'default-image.jpg';
            posterImage.style.Width = '100px'; // Adjust the desired width
            posterImage.style.Height = '150px'; // Adjust the desired height
         };

         movieItem.appendChild(posterImage);
  
        // Create movie name element
        const movieName = document.createElement('div');
        movieName.textContent = movie.title;
        movieItem.appendChild(movieName);
  
        // Create movie rating element
        const movieRating = document.createElement('div');
        movieRating.textContent = `Rating: ${movie.rating}`;
        movieItem.appendChild(movieRating);
  
        // Create 'Have Watched' checkbox
        const haveWatchedCheckbox = document.createElement('input');
        haveWatchedCheckbox.type = 'checkbox';
        haveWatchedCheckbox.checked = movie.haveWatched;
        haveWatchedCheckbox.addEventListener('change', () => {
          // Update the 'haveWatched' property in the allMovies array
          allMovies[index].haveWatched = haveWatchedCheckbox.checked;
        });
        movieItem.appendChild(haveWatchedCheckbox);
        movieItem.appendChild(document.createTextNode('  Have Watched'));
  
        movieList.appendChild(movieItem);
      } catch (error) {
        console.error(error);
      }
    });
  }
  
  
  
  // ... your existing code
  
  // Display all movies initially
  displayAllMovies();

  // ... your existing code

// Form for filtering movies by rating
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    // Get the minimum rating from the form
    const minRating = parseFloat(document.getElementById('ratingFilter').value);
  
    // Display high-rated movies
    displayHighRatedMovies(minRating);
  });
  
  // Function to display high-rated movies
  function displayHighRatedMovies(minRating) {
    const highRatedMovies = allMovies.filter(movie => movie.rating > minRating);
    const highRatedMoviesContainer = document.getElementById('highRatedMovies');
    highRatedMoviesContainer.innerHTML = ''; // Clear the existing list
  
    if (highRatedMovies.length === 0) {
      highRatedMoviesContainer.textContent = "No high-rated movies found.";
    } else {
      const highRatedMoviesList = document.createElement('ul');
      highRatedMovies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.textContent = `${movie.title}, rating of ${movie.rating}`;
        highRatedMoviesList.appendChild(movieItem);
      });
      highRatedMoviesContainer.appendChild(highRatedMoviesList);
    }
  }
  
  
  // Initially display high-rated movies with a minimum rating of 3
  //displayHighRatedMovies(3);
  
