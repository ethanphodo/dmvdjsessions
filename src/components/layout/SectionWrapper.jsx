export default function SectionWrapper({
  id,
  sectionNumber,
  sectionLabel,
  children,
  withDivider = true,
  withGrid = false,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`bg-[#050505] ${withGrid ? 'grid-bg' : ''} ${className}`}
    >
      {withDivider && <div className="syber-divider" />}

      <div className="max-w-7xl mx-auto px-6 py-24">
        {sectionNumber && sectionLabel && (
          <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
            [ {sectionNumber} ] {sectionLabel}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
