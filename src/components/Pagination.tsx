import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-end gap-2 absolute -bottom-14 md:bottom-0 right-0">
            {/* Previous Page Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-xl bg-white hover:bg-gray-50"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                    className={`rounded-xl min-w-[40px] h-10 ${
                        currentPage === page ? "bg-black hover:bg-black/90 text-white" : "bg-white hover:bg-gray-50"
                    }`}
                >
                    {page}
                </Button>
            ))}

            {/* Next Page Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-xl bg-white hover:bg-gray-50"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}