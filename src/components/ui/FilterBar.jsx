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
    <div className={`${className}`}>
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search sessions..."
            className="w-full px-4 py-2.5 bg-[#1A1A1A] border-none text-white text-sm placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#E21D1D] rounded-sm transition-all"
          />
        </div>

        {/* Genre */}
        <select
          value={filters.genre || 'all'}
          onChange={(e) => onFilterChange('genre', e.target.value)}
          className="px-4 py-2.5 bg-[#1A1A1A] border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E21D1D] rounded-sm cursor-pointer"
        >
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>

        {/* Series */}
        <select
          value={filters.series || 'all'}
          onChange={(e) => onFilterChange('series', e.target.value)}
          className="px-4 py-2.5 bg-[#1A1A1A] border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E21D1D] rounded-sm cursor-pointer"
        >
          <option value="all">All Series</option>
          {series.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Mood */}
        <select
          value={filters.mood || 'all'}
          onChange={(e) => onFilterChange('mood', e.target.value)}
          className="px-4 py-2.5 bg-[#1A1A1A] border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E21D1D] rounded-sm cursor-pointer"
        >
          <option value="all">All Moods</option>
          {moods.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-[#E21D1D] hover:text-white transition-colors"
          >
            Clear
          </button>
        )}

        {/* Count */}
        <span className="text-sm text-[#666] ml-auto">
          {resultCount} of {totalCount}
        </span>
      </div>
    </div>
  )
}
