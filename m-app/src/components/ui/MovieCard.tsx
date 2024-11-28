import React from "react";
import { Movie } from "../types";

interface MovieCardProps {
	movie: Movie;
	onClick: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
	return (
		<div
			className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105"
			onClick={() => onClick(movie.imdbID)}
		>
			<img
				src={movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/400"}
				alt={movie.Title}
				className="w-full h-full object-cover"
			/>
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
				<p className="text-gray-600">{movie.Year}</p>
			</div>
		</div>
	);
};