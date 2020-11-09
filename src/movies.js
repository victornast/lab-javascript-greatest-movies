// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(movies) {
  return movies
    .map((value) => value.director)
    .filter(
      (element, index, thisArray) => thisArray.indexOf(element) === index
    );
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(movies) {
  let arrayOfMovies = movies.filter(
    (value) =>
      value.director === 'Steven Spielberg' && value.genre.includes('Drama')
  );
  return arrayOfMovies.length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  const averageRate = movies.reduce((acc, val, ind, ori) => {
    if (!val.rate) {
      return acc + 0;
    } else {
      return acc + val.rate / ori.length;
    }
  }, 0);
  return Number(averageRate.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {
  return ratesAverage(
    movies.filter((element) => element.genre.includes('Drama'))
  );
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(movies) {
  let cloningArray = [...movies];
  cloningArray.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    }
  });
  return cloningArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  let alfaOrder = [...movies];
  alfaOrder.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else {
      return -1;
    }
  });
  let allMovies = [''];
  for (movie of alfaOrder) {
    if (allMovies.length < 21) {
      allMovies.push(movie.title);
    }
  }
  allMovies.shift();
  return allMovies;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  let lengthInMinutes = JSON.parse(JSON.stringify(movies));
  for (element of lengthInMinutes) {
    if (element.duration.split(' ').length === 2) {
      element.duration =
        parseInt(element.duration.split(' ')[0]) * 60 +
        parseInt(element.duration.split(' ')[1]);
    } else {
      if (element.duration[element.duration.length - 1] === 'h') {
        element.duration = parseInt(element.duration) * 60;
      } else {
        element.duration = parseInt(element.duration);
      }
    }
  }
  return lengthInMinutes;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {
  if (movies.length === 0) return null;
  let allYears = movies
    .map((value) => value.year)
    .filter((ele, ind, ara) => ara.indexOf(ele) === ind);
  allYears.sort((a, b) => a - b);
  console.log(allYears);
  let allYearsRates = [];

  for (let i = 0; i < allYears.length; i++) {
    let thisYearsMovies = movies.filter((ele) => ele.year === allYears[i]);
    let thisYearsRates = [];
    for (movie of thisYearsMovies) {
      thisYearsRates.push(movie.rate);
    }
    thisYearsRates = thisYearsRates.reduce(
      (avg, ele, i, array) => avg + ele / array.length,
      0
    );
    allYearsRates.push(thisYearsRates);
  }
  let highestRate = Math.max(...allYearsRates);
  let bestMovieYear = allYears[allYearsRates.indexOf(highestRate)];

  return `The best year was ${bestMovieYear} with an average rate of ${highestRate}`;
}
