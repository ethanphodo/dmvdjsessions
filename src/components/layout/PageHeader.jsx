export default function PageHeader({
  sectionNumber,
  sectionLabel,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="pt-24 pb-12">
      {/* Section Label */}
      <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
        [ {sectionNumber} ] {sectionLabel}
      </div>

      {/* Title */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-white italic">
          {title}
        </h1>

        {subtitle && (
          <p className="font-mono text-sm text-[#888] max-w-xl">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  )
}
