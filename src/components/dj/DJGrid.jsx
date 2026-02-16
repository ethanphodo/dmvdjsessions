import DJCard from './DJCard'

export default function DJGrid({ djs, onSelectDJ, columns = 3 }) {
  if (djs.length === 0) {
    return (
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center">
        <p className="font-mono text-sm text-[#888] uppercase">
          No DJs found.
        </p>
      </div>
    )
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns] || gridCols[3]}`}>
      {djs.map((dj) => (
        <DJCard key={dj.id} dj={dj} onClick={onSelectDJ} />
      ))}
    </div>
  )
}
