import { useEffect, useState } from "react";

import { getTodayMovies } from "../../api.js";
import MovieList from "../../components/MovieList/MovieList";

export const HomePage = () => {
  const [movies, setMoviesList] = useState([]);

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        const moviesData = await getTodayMovies();
        setMoviesList(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesList();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;