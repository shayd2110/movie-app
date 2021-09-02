import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeader from "./components/MovieListHeader";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorite";
import RemoveFavorite from "./components/RemoveFavorite";

function App() {
	const [movies, setMovies] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=cba22da8`;

		const response = await fetch(url);
		const resJson = await response.json();

		if (resJson.Search) {
			console.log(resJson);
			setMovies(resJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem("movie-app-fav")
		);
		if (movieFavorites) setFavorites(movieFavorites);
	}, []);

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		save2LocalStorage(newFavoriteList);
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);
		setFavorites(newFavoriteList);
		save2LocalStorage(newFavoriteList);
	};

	const save2LocalStorage = (items) => {
		localStorage.setItem("movie-app-fav", JSON.stringify(items));
	};

	return (
		<div className="container-fluid movie-app">
			<div className="row d-flex align-items-center mt-4 mb-4">
				<MovieListHeader heading="Movies" />
				<SearchBox
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
			</div>
			<div className="row">
				<MovieList
					movies={movies}
					handleFavoritesClick={addFavoriteMovie}
					favoriteComponent={AddFavorite}
				/>
			</div>
			<div className="row d-flex align-items-center mt-4 mb-4">
				<MovieListHeader heading="Favorites" />
			</div>
			<div className="row">
				<MovieList
					movies={favorites}
					handleFavoritesClick={removeFavoriteMovie}
					favoriteComponent={RemoveFavorite}
				/>
			</div>
		</div>
	);
}

export default App;
