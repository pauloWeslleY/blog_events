export const AlertHero = ({ title, description, status }) => (
  <span className={`alert ${status}`} role="alert">
    <strong>{title}</strong> {description}{' '}
  </span>
)
