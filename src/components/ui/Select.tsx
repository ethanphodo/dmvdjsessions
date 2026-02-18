import { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  name: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
}

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
}: SelectProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block font-mono text-xs uppercase tracking-tight text-[#888]"
        >
          {label}
          {required && <span className="text-[#E8E4E0] ml-1">*</span>}
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
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`
            w-full px-4 py-3 pr-10
            bg-[#141414] border border-[#1C1C1C]
            text-white text-sm font-mono
            appearance-none cursor-pointer
            focus:outline-none focus:border-[#E8E4E0] focus:ring-2 focus:ring-[#E8E4E0]/20
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-75
            ${error ? 'border-[#E8E4E0]' : ''}
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
            aria-hidden="true"
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
        <p id={`${name}-error`} className="font-mono text-xs text-[#E8E4E0] uppercase" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
