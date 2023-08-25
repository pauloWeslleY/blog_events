import './InputField.css'

export const InputField = ({ label, type, value, onChange }) => (
  <div className="form-floating mb-3">
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
