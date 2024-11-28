import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
	query: string;
	setQuery: (query: string) => void;
	onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	query,
	setQuery,
	onSearch,
}) => {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch();
		}
	};

	return (
		<div className="flex items-center gap-2 mb-8">
			<div className="relative flex-1">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Search for movies..."
					className="w-full p-3 pr-10 border rounded-lg"
				/>
				<button
					onClick={onSearch}
					className="absolute right-2 top-1/2 -translate-y-1/2"
				>
					<Search className="h-5 w-5 text-gray-500" />
				</button>
			</div>
		</div>
	);
};