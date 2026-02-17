function PageTitle({ title }) {
  return (
    <div className="text-center py-16 md:py-24">
      <h1 className="text-responsive-hero font-bold uppercase tracking-tight">
        <span className="text-[#666]">DMV:</span>{' '}
        <span className="text-white">{title}</span>
      </h1>
    </div>
  )
}

export default PageTitle
