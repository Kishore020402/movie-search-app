
export interface Movie {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
}

export interface MovieDetails {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Actors: string;
	Plot: string;
	Language: string;
	Poster: string;
	imdbRating: string;
	Response: string;
}

export interface SearchResponse {
	Search: Movie[];
	totalResults: string;
	Response: string;
	Error?: string;
}