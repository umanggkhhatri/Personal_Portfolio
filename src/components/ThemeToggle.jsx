import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-track">
        <span className={`theme-toggle-icon ${theme === 'dark' ? 'opacity-40' : 'opacity-100'}`}>
          ☀
        </span>
        <span className={`theme-toggle-icon ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`}>
          ☾
        </span>
        <span
          className="theme-toggle-thumb"
          style={{ transform: theme === 'dark' ? 'translateX(100%)' : 'translateX(0)' }}
        />
      </span>
    </button>
  )
}
