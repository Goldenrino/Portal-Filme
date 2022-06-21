const API_KEY = 'api_key=95497d724ddc1fd83f582720f2a0943e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }

  return (false);
}

function getMovie(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}?${API_KEY}`;
  fetch(url).then(res => res.json()).then(data => {
    showMovieDetail(data)
  })
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}

function showMovieDetail(data) {
  const main = document.getElementById('main');
  const { title, release_date, genres, poster_path, backdrop_path, vote_average, overview,homepage, id } = data;

  main.innerHTML = `
    <div class="movie-container" >
        <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-details">
          <h1>${title}</h1>
          <div class="metadata">
            <h4>${release_date.split('-')[0]}</h4>
            <h4>${vote_average}★</h4>
            <h4>${genres.map(genre => genre.name).join(' / ')}</h4>
          </div>
          <p>${overview}</p>
          <a class="btn btn-outline-light" href="${homepage}" target="_blank">Ver no site</a>
        </div>
    </div>
  `

  main.appendChild(movieEl);
}

getMovie(getQueryVariable('id'));