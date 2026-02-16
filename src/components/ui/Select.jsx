export default function Select({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select...',
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block font-mono text-xs uppercase tracking-tight text-[#888]"
        >
          {label}
          {required && <span className="text-[#E21D1D] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 pr-10
            bg-[#0A0A0A] border border-[#1A1A1A]
            text-white text-sm font-mono
            appearance-none cursor-pointer
            focus:outline-none focus:border-[#E21D1D]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-75
            ${error ? 'border-[#E21D1D]' : ''}
            ${!value ? 'text-[#888]/50' : ''}
          `}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#888]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="font-mono text-xs text-[#E21D1D] uppercase">
          {error}
        </p>
      )}
    </div>
  )
}
