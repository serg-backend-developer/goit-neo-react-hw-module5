import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { NavLink, Routes, Route, useParams, useLocation, useNavigate } from "react-router-dom";

import { getMovieDetails } from "../../api.js";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReview = lazy(() => import("../../components/MovieReviews/MovieReviews"));


const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Extract movieId from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef();

  const prevLocation = location.state || "/movies";
  let vote, imgPath;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (movieDetails) {
    imgPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
    vote = Math.round(movieDetails.vote_average * 10);
  } else {
    return <p>Loading movie details...</p>;
  }

  return (
    <Suspense>
      <button ref={ref} onClick={() => navigate(prevLocation)} className={css.back} >Go Back</button>
      <div className={css.info}>
        <img src={imgPath} className={css.image}></img>
        <div>
          <h1>{movieDetails.title}</h1>
          <p>User rate: {vote}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          {movieDetails.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
      <div className={css.extra}>
        <p>Additional information:</p>
        <nav className={css.subNav}>
          <NavLink
            to={`/movies/${movieId}/cast`}
            className={css.subLink}
            state={location}>
            Cast
          </NavLink>
          <NavLink
            to={`/movies/${movieId}/review`}
            className={css.subLink}
            state={location}>
            Reviews
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="review" element={<MovieReview />} />
      </Routes>
    </Suspense>
  );
};

export default MovieDetailsPage;