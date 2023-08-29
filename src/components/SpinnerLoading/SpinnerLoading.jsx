export function SpinnerLoading({ className, label }) {
  return (
    <div className={`spinner-border ${className}`} role="status">
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
