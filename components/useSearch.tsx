import { useState, useCallback, useEffect } from "react";

interface UseSearchProps {
  onSearch: (query: string) => Promise<string[]>;
}

export function useSearch({ onSearch }: UseSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      const handler = setTimeout(async () => {
        if (searchQuery.length > 0) {
          const results = await onSearch(searchQuery);
          setSuggestions(results);
        } else {
          setSuggestions([]);
        }
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    },
    [onSearch]
  );

  useEffect(() => {
    if (isTyping) {
      const cleanupFn = debouncedSearch(query);
      return cleanupFn;
    }
  }, [query, debouncedSearch, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setIsTyping(false);
    setQuery(suggestion);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return {
    query,
    suggestions,
    isFocused,
    handleInputChange,
    handleSuggestionClick,
    handleInputFocus,
  };
}
