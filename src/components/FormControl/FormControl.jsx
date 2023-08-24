import './FormControl.css'

export const FormControl = ({ children, background }) => {
  return (
    <div className="formControl" style={{ backgroundColor: background }}>
      {children}
    </div>
  )
}
