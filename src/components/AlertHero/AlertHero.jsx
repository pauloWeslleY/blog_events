export function AlertHero({ title, description, status }) {
  return (
    <span className={`alert ${status}`} role="alert">
      <strong>{title}</strong> {description}{' '}
    </span>
  )
}
