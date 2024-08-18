import React, { useState } from 'react';
import Header from './Header';
import MovieOptions from './MovieOptions';
import MovieDetail from './MovieDetails';

function MainComponent() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchMovies = async (title) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      let response = await fetch(`${apiURL}?s=${title}&apikey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        let data = await response.json();
        console.log(data);
        setMovies(data.Search || []);
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setMovie(inputValue);
    fetchMovies(inputValue);
  }

  function handleMovieSelect(movieId) {
    setSelectedMovieId(movieId);
  }

  return (
    <div>
      <Header movie={movie} handleChange={handleChange} length={movies.length}/> 
      <main style={{ display: 'flex' }}>
        <div className="movie-options-container">
          {movies.map((movie) => (
            <MovieOptions
              key={movie.imdbID}
              poster={movie.Poster}
              Title={movie.Title}
              country={movie.Country}
              year={movie.Year}
              onSelect={() => handleMovieSelect(movie.imdbID)}
            /> 
          ))}
        </div>
        <MovieDetail movieId={selectedMovieId} />
      </main>
    </div>
  )
}

export default MainComponent;
