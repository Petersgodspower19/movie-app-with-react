import React from 'react'
import logo from "../assets/film.png";

function Header({handleChange, movie, length}) {
  return (
    <header>
        <article>
        <img src={logo} alt="" />
         <h4>Movie</h4>
        </article>
        <input type='text'  onChange={handleChange} value={movie}
         placeholder='search for your movie'/>

         <h4>Found {length} results</h4>
    </header>
  )
}

export default Header
