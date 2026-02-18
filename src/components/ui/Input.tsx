import { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  name: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block font-mono text-xs uppercase tracking-tight text-[#6B6865]"
        >
          {label}
          {required && <span className="text-[#E8E4E0] ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`
          w-full px-4 py-3
          bg-[#141414] border border-[#1C1C1C]
          text-white text-sm font-mono
          placeholder:text-[#6B6865]/50
          focus:outline-none focus:border-[#E8E4E0] focus:ring-2 focus:ring-[#E8E4E0]/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-75
          ${error ? 'border-[#E8E4E0]' : ''}
        `}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="font-mono text-xs text-[#E8E4E0] uppercase" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
