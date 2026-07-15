import React from 'react';
import { Filter, Search } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
  onClear,
}) => {
  return (
    <div className="z-30 md:sticky md:top-[72px]">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-primary/15 bg-white/80 px-4 py-4 shadow-soft backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/45" size={20} />
            <input
              type="text"
              placeholder="Search products, pricing, or script text..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-primary/20 bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary/70">
              <Filter size={14} />
              <span>Category</span>
            </div>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border border-primary/20 hover:border-primary/40 hover:bg-accent-soft'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-sm text-secondary/75">Sort</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="scripts-desc">Most scripts</option>
                <option value="scripts-asc">Fewest scripts</option>
              </select>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="rounded-lg border border-primary/25 bg-white px-3 py-2 text-sm font-medium text-secondary transition hover:bg-primary/10"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
