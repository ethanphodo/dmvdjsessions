import FilterBar from '../ui/FilterBar'
import { GENRES, SERIES, MOODS } from '../../utils/constants'

export default function VideoFilters({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  resultCount,
  totalCount,
}) {
  const filterOptions = {
    genres: GENRES,
    series: SERIES,
    moods: MOODS,
  }

  return (
    <FilterBar
      filters={filters}
      onFilterChange={onFilterChange}
      onReset={onReset}
      hasActiveFilters={hasActiveFilters}
      resultCount={resultCount}
      totalCount={totalCount}
      filterOptions={filterOptions}
    />
  )
}
