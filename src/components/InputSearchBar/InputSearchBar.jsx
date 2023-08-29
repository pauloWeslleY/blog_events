import './InputSearchBar.css'

export function InputSearchBar({ value, onChange }) {
  return (
    <div className="input-search-bar">
      <input
        id="search-bar"
        type="text"
        className="input-search"
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor="search-bar">Pesquisar Eventos</label>
    </div>
  )
}
