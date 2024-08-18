import React from 'react';

function MovieOptions({ poster, Title, year, country, onSelect }) {
  return (
    <section className='movie-options' onClick={onSelect}>
      <div className='movie-option-div'>
        <img src={poster} alt='' />
        <article>
          <h3 id='movie-option-title'>{Title}</h3>
          <p id='movie-option-year'>{year}</p>
          <p id='movie-option-title'>{country}</p>
        </article>
      </div>
    </section>
  )
}

export default MovieOptions;
