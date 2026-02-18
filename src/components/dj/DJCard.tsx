import type { DJ } from '../../types'
import { GENRES, LOCATIONS } from '../../utils/constants'

interface DJCardProps {
  dj: DJ
  onClick?: (dj: DJ) => void
  className?: string
}

export default function DJCard({ dj, onClick, className = '' }: DJCardProps) {
  const { name, bio, image, genres, location, socials, featured } = dj

  const locationLabel = LOCATIONS.find((l) => l.value === location)?.label ?? location

  const getGenreLabel = (genreValue: string) => {
    return GENRES.find((g) => g.value === genreValue)?.label ?? genreValue
  }

  return (
    <div
      onClick={() => onClick?.(dj)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(dj)
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        group border border-[#1A1A1A] bg-[#0A0A0A]
        hover:border-[#E21D1D] hover:shadow-[4px_4px_0_0_#E21D1D]
        transition-all duration-75 cursor-cross
        ${className}
      `}
    >
      {/* Header */}
      <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-tight text-white">
          DJ_PROFILE
        </span>
        {featured && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E21D1D]" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase text-[#888]">FEATURED</span>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="aspect-square bg-[#1A1A1A] relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-[#888] uppercase">
              PROFILE_IMG
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-black uppercase tracking-tighter mb-1 text-white group-hover:text-[#E21D1D] transition-colors">
          {name}
        </h3>
        <p className="font-mono text-xs text-[#888] uppercase mb-3">
          {locationLabel}
        </p>
        <p className="text-xs text-[#888] leading-relaxed line-clamp-2 mb-4">
          {bio}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-4">
          {genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 bg-[#1A1A1A] font-mono text-[10px] text-[#888] uppercase"
            >
              {getGenreLabel(genre)}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex gap-3">
          {socials.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#888] hover:text-[#E21D1D] transition-colors"
              aria-label={`${name} on Instagram`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          )}
          {socials.soundcloud && (
            <a
              href={socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#888] hover:text-[#E21D1D] transition-colors"
              aria-label={`${name} on SoundCloud`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.058-.05-.1-.1-.1zm-.899.828c-.058 0-.095.045-.103.094l-.18 1.431.18 1.424c.008.05.045.095.103.095s.095-.045.1-.095l.216-1.424-.216-1.431c-.005-.049-.042-.094-.1-.094zm1.83-.598c-.065 0-.111.047-.12.108l-.22 2.023.22 1.986c.009.065.055.108.12.108.063 0 .109-.043.117-.108l.252-1.986-.252-2.023c-.008-.063-.054-.108-.117-.108zm.922-.166c-.071 0-.12.048-.129.117l-.2 2.189.2 2.114c.009.07.058.118.129.118s.12-.048.128-.118l.227-2.114-.227-2.189c-.008-.07-.057-.117-.128-.117zm.932-.075c-.079 0-.135.05-.142.127l-.176 2.265.176 2.163c.007.079.063.128.142.128.078 0 .134-.049.14-.128l.199-2.163-.199-2.265c-.006-.077-.062-.127-.14-.127zm.952-.033c-.085 0-.145.053-.152.135l-.156 2.298.156 2.19c.007.085.067.136.152.136.084 0 .143-.051.15-.136l.178-2.19-.178-2.298c-.007-.082-.066-.135-.15-.135zm.968.017c-.093 0-.156.055-.162.145l-.136 2.136.136 2.218c.006.09.069.144.162.144.092 0 .155-.054.161-.144l.153-2.218-.153-2.136c-.006-.09-.069-.145-.161-.145zm.99.087c-.1 0-.166.056-.172.153l-.117 2.049.117 2.247c.006.098.072.154.172.154.1 0 .165-.056.171-.154l.131-2.247-.131-2.049c-.006-.097-.071-.153-.171-.153zm1.027.064c-.107 0-.174.06-.181.161l-.098 1.985.098 2.275c.007.105.074.161.181.161.106 0 .173-.056.18-.161l.11-2.275-.11-1.985c-.007-.101-.074-.161-.18-.161zm1.049.032c-.114 0-.185.061-.191.17l-.079 1.953.079 2.303c.006.113.077.17.191.17.115 0 .184-.057.191-.17l.089-2.303-.089-1.953c-.007-.109-.076-.17-.191-.17zm1.076.038c-.122 0-.195.064-.201.18l-.059 1.915.059 2.331c.006.12.079.18.201.18.121 0 .193-.06.2-.18l.067-2.331-.067-1.915c-.007-.116-.079-.18-.2-.18zm1.097.085c-.13 0-.202.066-.209.189l-.039 1.83.039 2.356c.007.126.079.189.209.189s.201-.063.208-.189l.044-2.356-.044-1.83c-.007-.123-.078-.189-.208-.189zm1.123.094c-.136 0-.211.067-.218.197l-.02 1.736.02 2.384c.007.133.082.198.218.198.137 0 .21-.065.217-.198l.022-2.384-.022-1.736c-.007-.13-.08-.197-.217-.197zm1.141.206c-.143 0-.218.07-.225.206l-.001 1.53.001 2.41c.007.14.082.207.225.207.144 0 .217-.067.224-.207l.001-2.41-.001-1.53c-.007-.136-.08-.206-.224-.206zm1.868-.212c-.13 0-.24.042-.34.116-.05-.602-.517-1.079-1.087-1.079-.147 0-.29.035-.418.098-.097.047-.124.094-.124.188v4.502c0 .103.084.191.188.201 1.078.007 3.048 0 3.048 0 1.013 0 1.835-.825 1.835-1.84 0-1.017-.822-1.84-1.835-1.84-.097 0-.193.01-.287.027z" />
              </svg>
            </a>
          )}
          {socials.mixcloud && (
            <a
              href={socials.mixcloud}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#888] hover:text-[#E21D1D] transition-colors"
              aria-label={`${name} on Mixcloud`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.462 8.596c-1.322 0-2.462 1.07-2.462 2.47 0 1.387 1.14 2.444 2.462 2.444 1.336 0 2.462-1.044 2.462-2.457 0-1.387-1.126-2.457-2.462-2.457zm9.987-.103c-.86 0-1.626.38-2.16 1.015-.53-.608-1.296-.988-2.16-.988-1.52 0-2.74 1.21-2.74 2.547 0 1.336 1.22 2.547 2.74 2.547.864 0 1.63-.38 2.16-1.015.534.635 1.3 1.015 2.16 1.015 1.52 0 2.74-1.21 2.74-2.547 0-1.336-1.22-2.574-2.74-2.574zm6.89.103c-1.323 0-2.463 1.07-2.463 2.47 0 1.387 1.14 2.444 2.462 2.444 1.337 0 2.463-1.044 2.463-2.457 0-1.387-1.126-2.457-2.463-2.457z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
