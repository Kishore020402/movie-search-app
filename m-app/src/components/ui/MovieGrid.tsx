import React from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "../types";

interface MovieGridProps {
	movies: Movie[];
	onMovieSelect: (id: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
	movies,
	onMovieSelect,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{movies.map((movie) => (
				<MovieCard key={movie.imdbID} movie={movie} onClick={onMovieSelect} />
			))}
		</div>
	);
};