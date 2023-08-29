import './FormControl.css'

export function FormControl({ children, background }) {
  return (
    <div className="formControl" style={{ backgroundColor: background }}>
      {children}
    </div>
  )
}
