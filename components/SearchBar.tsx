import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useSearch } from "./useSearch";

interface SearchBarProps {
  onSearch: (query: string) => Promise<string[]>;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const {
    query,
    suggestions,
    isFocused,
    handleInputChange,
    handleSuggestionClick,
    handleInputFocus,
  } = useSearch({ onSearch });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search locations..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="text-center transition-all duration-300"
        />
        {isFocused && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
