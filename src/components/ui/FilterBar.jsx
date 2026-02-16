import Select from './Select'

export default function FilterBar({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  resultCount,
  totalCount,
  filterOptions = {},
  className = '',
}) {
  const { genres = [], series = [], moods = [] } = filterOptions

  return (
    <div className={`border border-[#1A1A1A] bg-[#0A0A0A] ${className}`}>
      {/* Filter Header */}
      <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-tight text-white">
          FILTERS
        </span>
        <span className="font-mono text-xs text-[#888]">
          {resultCount} / {totalCount} SESSIONS
        </span>
      </div>

      {/* Filter Controls */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-tight text-[#888]">
              Search
            </label>
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="DJ name, title..."
              className="w-full px-4 py-2 bg-[#050505] border border-[#1A1A1A] text-white text-sm font-mono placeholder:text-[#888]/50 focus:outline-none focus:border-[#E21D1D] transition-colors"
            />
          </div>

          {/* Genre */}
          <Select
            label="Genre"
            name="genre"
            value={filters.genre || 'all'}
            onChange={(e) => onFilterChange('genre', e.target.value)}
            options={[{ value: 'all', label: 'All Genres' }, ...genres]}
          />

          {/* Series */}
          <Select
            label="Series"
            name="series"
            value={filters.series || 'all'}
            onChange={(e) => onFilterChange('series', e.target.value)}
            options={[{ value: 'all', label: 'All Series' }, ...series]}
          />

          {/* Mood */}
          <Select
            label="Mood"
            name="mood"
            value={filters.mood || 'all'}
            onChange={(e) => onFilterChange('mood', e.target.value)}
            options={[{ value: 'all', label: 'All Moods' }, ...moods]}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="mt-4 font-mono text-xs uppercase tracking-tight text-[#E21D1D] hover:text-white transition-colors"
          >
            ← Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}
