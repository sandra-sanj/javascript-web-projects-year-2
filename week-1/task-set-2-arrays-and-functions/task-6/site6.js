const movies = [];
const moviesCount = prompt('Number of movies to save:');

// enter movies to array
for (let i = 1; i <= moviesCount; i++) {
  const title = prompt(`Title of movie ${i}:`);
  const rating = prompt(`Rating of movie ${i}:`);

  const movie = {
    title: title,
    rating: rating,
  };
  movies.push(movie);
}

// sort by rating
movies.sort((a, b) => b.rating - a.rating);

// display movies in document as table
const table = document.getElementById('movies-table');

// insert table header row
const headerRow = table.insertRow(0);
const cellTitle = headerRow.insertCell(0);
const cellRating = headerRow.insertCell(1);
cellTitle.innerHTML = 'Title';
cellRating.innerHTML = 'Rating';

// insert array contents to table
for (let i = 0; i < movies.length; i++) {
  const row = table.insertRow(i + 1);
  const cellTitle = row.insertCell(0);
  const cellRating = row.insertCell(1);

  cellTitle.innerHTML = movies[i].title;
  cellRating.innerHTML = movies[i].rating;
}

// display highest rated movie in document
document.getElementById(
  'highest-rated-movie'
).innerHTML = `Highest rated movie is "${movies[0].title}" with the rating of ${movies[0].rating}`;
