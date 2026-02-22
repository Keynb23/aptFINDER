// frontend/src/components/searchBars/searchBars.jsx
// this is not displaying at all, but the more I think about. it isn't needed if we're using sliders to determine the commute time.
import { SearchIcon, XIcon } from "lucide-react";

import {
  SearchField as AriaSearchField,
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult,
} from "react-aria-components";
import { Description, FieldError, FieldGroup, Input, Label } from "./Field";
import { composeTailwindRenderProps } from "./utils";
import { FieldButton } from "./FieldButton";

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}) {

  const SearchBar = () => {
    return (
      <label
        className="mx-auto mt-40 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          placeholder="your keyword here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
        />
        <div className="relative">
          {/* Loading animation change opacity to display */}
          <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
            <svg
              className="opacity-0 animate-spin w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <div className="flex items-center transition-all opacity-1">
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
              Search
            </span>
          </div>
        </div>
      </label>
    );
  };

  return (
    <SearchBar />
  );  
}

export default SearchBar;