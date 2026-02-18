function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4">
      <button
        onClick={handlePrevious}
        onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={`px-4 py-2 text-sm font-medium uppercase tracking-wide border transition-all ${
          currentPage === 1
            ? 'border-[#222] text-[#444] cursor-not-allowed'
            : 'border-[#333] text-[#888] hover:border-white hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </button>

      <span className="text-sm text-gray-500">
        Page <span className="text-white">{currentPage}</span> of{' '}
        <span className="text-white">{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        onKeyDown={(e) => handleKeyDown(e, handleNext)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={`px-4 py-2 text-sm font-medium uppercase tracking-wide border transition-all ${
          currentPage === totalPages
            ? 'border-[#222] text-[#444] cursor-not-allowed'
            : 'border-[#333] text-[#888] hover:border-white hover:text-white'
        }`}
      >
        <span className="flex items-center gap-2">
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </nav>
  )
}

export default Pagination
