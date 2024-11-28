import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	return (
		<div className="flex justify-center gap-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 border rounded-lg disabled:opacity-50"
			>
				Previous
			</button>
			<span className="px-4 py-2">
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-4 py-2 border rounded-lg disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
};