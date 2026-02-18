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
    <div className={`w-full ${className}`}>
      {/* Filter Controls - Centered Layout */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {/* Search - Full Width on Mobile */}
        <div className="w-full">
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search sessions..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#D6A756] focus:border-transparent rounded-lg backdrop-blur-sm transition-all"
          />
        </div>

        {/* Filter Dropdowns - Centered Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Genre */}
          <select
            value={filters.genre || 'all'}
            onChange={(e) => onFilterChange('genre', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A756] focus:border-transparent rounded-lg backdrop-blur-sm cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
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
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A756] focus:border-transparent rounded-lg backdrop-blur-sm cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
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
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A756] focus:border-transparent rounded-lg backdrop-blur-sm cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            <option value="all">All Moods</option>
            {moods.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          {/* Reset Button - Styled */}
          {hasActiveFilters ? (
            <button
              onClick={onReset}
              className="w-full px-4 py-3 bg-[#D6A756]/10 border border-[#D6A756]/30 text-[#D6A756] text-sm font-medium uppercase tracking-wide rounded-lg hover:bg-[#D6A756]/20 transition-all"
            >
              Clear
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        {/* Results Count - Centered */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="text-xs font-mono text-[#666] uppercase tracking-wide">
            Showing {resultCount} of {totalCount} sessions
          </span>
          {hasActiveFilters && (
            <span className="text-xs font-mono text-[#D6A756] uppercase tracking-wide">
              Filtered
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
