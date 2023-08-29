import './InputField.css'

export function InputField({ label, type, value, onChange }) {
  return (
    <div className="input-field form-floating mb-3">
      <input
        id={type}
        type={type}
        className="form-control fw-semibold"
        placeholder="email@example.com"
        onChange={onChange}
        value={value}
      />
      <label htmlFor={type} className="form-label fw-medium text-muted">
        {label}
      </label>
    </div>
  )
}
