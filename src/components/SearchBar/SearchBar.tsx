const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search recipes"
        className="input rounded-2xl w-full pl-10 bg-accent bg-opacity-5 placeholder-accent placeholder-opacity-50"
        value={""}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className="absolute top-0 left-0 ml-3 mt-3 w-6 h-6 text-gray-500 opacity-40 cursor-pointer"
      >
        <path d="M21 3C11.6016 3 4 10.6016 4 20C4 29.3984 11.6016 37 21 37C24.3555 37 27.4609 36.0156 30.0938 34.3438L42.375 46.625L46.625 42.375L34.5 30.2812C36.6797 27.4219 38 23.8789 38 20C38 10.6016 30.3984 3 21 3ZM21 7C28.1992 7 34 12.8008 34 20C34 27.1992 28.1992 33 21 33C13.8008 33 8 27.1992 8 20C8 12.8008 13.8008 7 21 7Z" />
      </svg>
    </div>
  );
};

export default SearchBar;
