import './InputField.css'

export const InputField = ({ label, type, value, onChange }) => (
  <div className="form-floating w-50 mb-3">
    <input
      type={type}
      id={type}
      className="form-control"
      placeholder="name@example.com"
      onChange={onChange}
      value={value}
    />
    <label htmlFor={type} className="form-label fw-medium text-muted ">
      {label}
    </label>
  </div>
)
