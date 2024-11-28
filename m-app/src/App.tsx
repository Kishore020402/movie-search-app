import React, { useState, useCallback, useEffect } from "react";
import { SearchBar } from "./components/ui/SearchBar";
import { MovieGrid } from "./components/ui/MovieGrid";
import { Pagination } from "./components/ui/pagination";
import { MovieDetails } from "./components/ui/MovieDetails";
import debounce from "lodash/debounce";

import { Movie, SearchResponse } from "./components/types";

const App: React.FC = () => {
	const [query, setQuery] = useState<string>("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
	const [totalResults, setTotalResults] = useState<number>(0);

	const API_KEY = "e77ee00e";

	const fetchDefaultMovies = async (page: number = 1) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&s=marvel&page=${page}`
			);
			const data: SearchResponse = await response.json();

			if (data.Response === "True") {
				setMovies(data.Search);
				setTotalResults(parseInt(data.totalResults));
				setCurrentPage(page);
			} else {
				setError(data.Error || "No default movies found");
			}
		} catch (err) {
			setError("Failed to fetch default movies. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const searchMovies = async (searchQuery: string, page: number = 1) => {
		if (!searchQuery.trim()) {
			fetchDefaultMovies(page);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${page}`
			);
			const data: SearchResponse = await response.json();

			if (data.Response === "True") {
				setMovies(data.Search);
				setTotalResults(parseInt(data.totalResults));
				setCurrentPage(page);
			} else {
				setError(data.Error || "No movies found");
				setMovies([]);
				setTotalResults(0);
			}
		} catch (err) {
			setError("Failed to fetch movies. Please try again.");
			setMovies([]);
			setTotalResults(0);
		} finally {
			setLoading(false);
		}
	};

	const debouncedSearch = useCallback(
		debounce((searchQuery: string, page: number) => {
			searchMovies(searchQuery, page);
		}, 300),
		[]
	);

	useEffect(() => {
		if (query) {
			debouncedSearch(query, 1);
		} else {
			fetchDefaultMovies();
		}

		return () => {
			debouncedSearch.cancel();
		};
	}, [query, debouncedSearch]);

	const handlePageChange = useCallback(
		(page: number) => {
			if (query) {
				searchMovies(query, page);
			} else {
				fetchDefaultMovies(page);
			}
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		[query]
	);

	const handleQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		setCurrentPage(1);
	};

	const totalPages = Math.ceil(totalResults / 10);

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8 text-center">Movie Search App</h1>

			<SearchBar
				query={query}
				setQuery={handleQueryChange}
				onSearch={() => searchMovies(query, 1)}
			/>

			{loading && <div className="text-center py-4">Loading...</div>}

			{error && <div className="text-red-500 text-center py-4">{error}</div>}

			<MovieGrid movies={movies} onMovieSelect={setSelectedMovieId} />

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>

			{selectedMovieId && (
				<MovieDetails
					movieId={selectedMovieId}
					onClose={() => setSelectedMovieId(null)}
				/>
			)}
		</div>
	);
};

export default App;