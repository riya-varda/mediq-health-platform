import { Menu, Sun, Moon, Home } from 'lucide-react'

export default function Header({ title, dark, toggleDark, toggleSidebar, onLanding }) {
  return (
    <header className="flex items-center gap-3 h-14 px-4 bg-white dark:bg-[#0d1117] border-b border-slate-200 dark:border-slate-700/40 flex-shrink-0">
      <button
        onClick={toggleSidebar}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition lg:hidden"
      >
        <Menu size={20} />
      </button>

      <h1 className="flex-1 font-semibold text-slate-800 dark:text-slate-100 text-base">{title}</h1>

      {onLanding && (
        <button
          onClick={onLanding}
          title="Back to Home"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Home size={13} />
          <span className="hidden sm:inline">Landing</span>
        </button>
      )}

      <button
        onClick={toggleDark}
        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
        <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
      </button>
    </header>
  )
}
