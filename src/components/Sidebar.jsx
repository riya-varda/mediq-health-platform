import {
  Home, MessageCircle, AlertCircle, FileText,
  Pill, Calculator, Zap, TriangleAlert, MapPin, X, Heart, Activity
} from 'lucide-react'

const NAV = [
  { id: 'home',      label: 'Home',                  Icon: Home,          color: '#4f8ef7' },
  { id: 'chat',      label: 'AI Chatbot',             Icon: MessageCircle, color: '#22c55e' },
  { id: 'symptom',   label: 'Symptom Checker',        Icon: AlertCircle,   color: '#f97316' },
  { id: 'report',    label: 'Health Report',          Icon: FileText,      color: '#4f8ef7' },
  { id: 'rx',        label: 'Prescription Explainer', Icon: Pill,          color: '#a855f7' },
  { id: 'bmi',       label: 'BMI Calculator',         Icon: Calculator,    color: '#06b6d4' },
  { id: 'aid',       label: 'First Aid Guide',        Icon: Zap,           color: '#ef4444' },
  { id: 'risk',      label: 'Health Risk Score',      Icon: TriangleAlert, color: '#f59e0b' },
  { id: 'hospitals', label: 'Find Hospitals',         Icon: MapPin,        color: '#ec4899' },
]

export default function Sidebar({ page, setPage, open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          flex flex-col w-64 h-full
          bg-white dark:bg-[#060d1a]
          border-r border-slate-200 dark:border-slate-800/60
          transition-transform duration-250
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #059669, #2563eb)' }}>
              <Heart size={16} color="white" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-900 dark:text-white text-base leading-tight">MediQ</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Health Intelligence</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pb-2 pt-1">Navigation</div>
          {NAV.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              onClick={() => { setPage(id); onClose() }}
              className={`nav-item w-full ${page === id ? 'nav-item-active' : ''}`}
              style={page === id ? { '--tw-ring-color': color } : {}}
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                <Icon size={13} style={{ color }} />
              </div>
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #059669)' }}>
              <Activity size={12} color="white" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Powered by Groq AI</div>
              <div className="text-[9px] text-slate-400">Llama 3.3 70B · v3.0</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export { NAV }
