import React, { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { MovieDetails as MovieDetailsType } from "../types";

interface MovieDetailsProps {
	movieId: string;
	onClose: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
	movieId,
	onClose,
}) => {
	const [details, setDetails] = useState<MovieDetailsType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const API_KEY = "e77ee00e";

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`
				);
				const data: MovieDetailsType = await response.json();
				if (data.Response === "True") {
					setDetails(data);
				}
			} catch (error) {
				console.error("Failed to fetch movie details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieDetails();
	}, [movieId]);

	if (loading) {
		return <div className="text-center py-8">Loading details...</div>;
	}

	if (!details) {
		return <div className="text-center py-8">Movie details not found</div>;
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
				>
					<X className="h-6 w-6" />
				</button>

				<div className="p-6">
					<div className="flex flex-col md:flex-row gap-6">
						<img
							src={
								details.Poster !== "N/A"
									? details.Poster
									: "/api/placeholder/300/450"
							}
							alt={details.Title}
							className="w-full md:w-72 h-auto rounded-lg object-contain"
						/>

						<div className="flex-1">
							<h2 className="text-2xl font-bold mb-2">{details.Title}</h2>
							<div className="flex items-center gap-2 mb-4">
								<Star className="h-5 w-5 text-yellow-400 fill-current" />
								<span>{details.imdbRating}/10</span>
							</div>

							<div className="space-y-4">
								<div className="flex flex-wrap gap-2">
									{details.Genre.split(", ").map((genre) => (
										<span
											key={genre}
											className="px-3 py-1 bg-gray-100 rounded-full text-sm"
										>
											{genre}
										</span>
									))}
								</div>

								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<p className="font-semibold">Released</p>
										<p>{details.Released}</p>
									</div>
									<div>
										<p className="font-semibold">Runtime</p>
										<p>{details.Runtime}</p>
									</div>
									<div>
										<p className="font-semibold">Director</p>
										<p>{details.Director}</p>
									</div>
									<div>
										<p className="font-semibold">Language</p>
										<p>{details.Language}</p>
									</div>
								</div>

								<div>
									<h3 className="font-semibold mb-2">Plot</h3>
									<p className="text-gray-600">{details.Plot}</p>
								</div>

								<div>
									<h3 className="font-semibold mb-2">Cast</h3>
									<p className="text-gray-600">{details.Actors}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};