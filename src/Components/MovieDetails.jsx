import React, { useEffect, useState } from 'react';

function MovieDetail({ movieId }) {
  const [movieDetail, setMovieDetail] = useState(null);

  const fetchMovieDetail = async (id) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      let response = await fetch(`${apiURL}?i=${id}&apikey=${apiKey}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        let data = await response.json();
        setMovieDetail(data);
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (movieId) {
      fetchMovieDetail(movieId);
    }
  }, [movieId]);

  if (!movieDetail) {
    return <div>Select a movie to see details</div>;
  }

  return (
    <section className="movie-detail">
    <img src={movieDetail.Poster} alt=''/>
      <h2>{movieDetail.Title}</h2>
      <h3>Rated: {movieDetail.Rated}</h3>
      <p><strong>imdbRating: {movieDetail.imdbRating}</strong></p>
      <p><strong>Staring: {movieDetail.Actors}</strong></p>
      <p><strong>Year:</strong> {movieDetail.Year}</p>
      <p><strong>Director:</strong> {movieDetail.Director}</p>
      <p><strong>Writer(s): {movieDetail.Writer}</strong></p>
      <p><strong>Plot:</strong> {movieDetail.Plot}</p>
    </section>
  );
}

export default MovieDetail;
