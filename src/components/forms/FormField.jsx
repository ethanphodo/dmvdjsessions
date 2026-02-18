export default function FormField({
  children,
  label,
  name,
  required = false,
  error,
  hint,
  className = '',
}) {
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
      {children}
      {hint && !error && (
        <p className="font-mono text-[10px] text-[#888]">
          {hint}
        </p>
      )}
      {error && (
        <p className="font-mono text-xs text-[#E8E4E0] uppercase">
          {error}
        </p>
      )}
    </div>
  )
}
