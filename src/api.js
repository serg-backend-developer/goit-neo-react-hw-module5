import axios from "axios";

import { ACCESS_TOKEN } from "./consts";

export const fetchMovieCast = async (movie) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${movie}/credits?language=en-US`,
		{
			headers: {
				accept: "application/json",
				Authorization: ACCESS_TOKEN,
			},
		}
	);
	return response.data;
};

export const fetchMovieReviews = async (movie) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${movie}/reviews`,
		{
			headers: {
				accept: "application/json",
				Authorization: ACCESS_TOKEN,
			},
		}
	);
	return response.data;
};

export const fetchMovieBySearch = async (search) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
		{
			headers: {
				accept: "application/json",
				Authorization: ACCESS_TOKEN,
			},
		}
	);
	return response.data;
};

export const getTodayMovies = async () => {
	try {
		const response = await axios.get(
			"https://api.themoviedb.org/3/trending/movie/day",
			{
				headers: {
					accept: "application/json",
					Authorization: ACCESS_TOKEN,
				},
				params: {
					language: "en-US",
					page: 1,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMovieDetails = async (movie) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movie}?language=en-US`,
			{
				headers: {
					accept: "application/json",
					Authorization: ACCESS_TOKEN,
				},
				params: {
					language: "en-US",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(`Error fetching movie details for ID ${movie}:`, error);
		throw error;
	}
};
