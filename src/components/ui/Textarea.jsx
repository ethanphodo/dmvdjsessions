export default function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
  ...props
}) {
  const charCount = value?.length || 0

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
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3
          bg-[#0A0A0A] border border-[#1A1A1A]
          text-white text-sm font-mono
          placeholder:text-[#888]/50
          focus:outline-none focus:border-[#E21D1D]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-75 resize-none
          ${error ? 'border-[#E21D1D]' : ''}
        `}
        {...props}
      />
      <div className="flex justify-between items-center">
        {error ? (
          <p className="font-mono text-xs text-[#E21D1D] uppercase">
            {error}
          </p>
        ) : (
          <span />
        )}
        {maxLength && (
          <span className="font-mono text-xs text-[#888]">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
