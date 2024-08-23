import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieCast } from "../../api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setMovieCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const movieCastData = await fetchMovieCast(movieId);
        setMovieCast(movieCastData.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    getMovieCast();
  }, [movieId]);

  return (
    <div className={css.movieCastContainer}>
      <h2>Cast</h2>
      <ul className={css.movieCastList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.movieCastItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p className={css.actor}>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;