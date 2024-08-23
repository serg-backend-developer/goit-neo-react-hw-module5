import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieReviews } from "../../api.js";


const MovieReview = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setMovieReviews(reviewsData.results);
      } catch (error) {
        setError(true);
        console.error("Error fetching movieReviews:", error);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (error) {
    return <p>Could not fetch movieReviews. Please try again later.</p>;
  }

  if (movieReviews.length === 0) {
    return <p>No movieReviews available for this movie.</p>;
  }

  return (
    <div >
      <h2>Reviews</h2>
      <ul>
        {movieReviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReview;