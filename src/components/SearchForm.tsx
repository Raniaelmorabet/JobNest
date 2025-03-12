import { useState, FormEvent } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface SearchFormProps {
  onSearch: (searchParams: { keyword: string; location: string }) => Promise<void>;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  // State for keyword input
  const [keyword, setKeyword] = useState<string>("");

  // State for location input
  const [location, setLocation] = useState<string>("");

  // State to handle loading state during search
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent search if both fields are empty
    if (!keyword.trim() && !location.trim()) return;

    setIsSearching(true);
    try {
      await onSearch({ keyword, location });
    } finally {
      setIsSearching(false);
    }
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto gap-4 sm:rounded-full rounded-lg bg-white p-2"
      >
        {/* Keyword Input */}
        <div className="flex flex-1 items-center gap-3 pl-4 border-b sm:border-b-0 sm:border-r">
          <Search className="h-5 w-5 text-gray-400" />
          <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-1 text-black bg-transparent outline-none placeholder:text-gray-400 py-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Location Input */}
        <div className="flex flex-1 items-center gap-3 pl-4">
          <MapPin className="h-5 w-5 text-gray-400" />
          <input
              type="text"
              placeholder="City or country"
              className="flex-1 text-black bg-transparent outline-none placeholder:text-gray-400 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center mx-auto">
          <Button
              type="submit"
              className="w-full rounded-full sm:w-auto px-8 bg-black"
              disabled={isSearching}
          >
            {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Searching...
                </div>
            ) : (
                "Search"
            )}
          </Button>
        </div>
      </form>
  );
}