import {
  MessageCircle, AlertCircle, FileText, Pill,
  Calculator, Zap, TriangleAlert, MapPin, ArrowRight,
  Activity, Shield, Clock, Heart
} from 'lucide-react'

const FEATURES = [
  { id: 'chat',      Icon: MessageCircle,  title: 'AI Chatbot',             desc: 'Ask any health question and get instant Groq-powered answers', color: '#22c55e',  bg: 'rgba(34,197,94,0.1)' },
  { id: 'symptom',   Icon: AlertCircle,    title: 'Symptom Checker',        desc: 'Get a structured health analysis based on your symptoms',    color: '#f97316',  bg: 'rgba(249,115,22,0.1)' },
  { id: 'report',    Icon: FileText,       title: 'Health Report',          desc: 'Generate a professional PDF clinical report powered by AI',   color: '#4f8ef7',  bg: 'rgba(79,142,247,0.1)' },
  { id: 'rx',        Icon: Pill,           title: 'Prescription Explainer', desc: 'Understand your medicines and prescriptions in plain language', color: '#a855f7',  bg: 'rgba(168,85,247,0.1)' },
  { id: 'bmi',       Icon: Calculator,     title: 'BMI Calculator',         desc: 'Calculate your body mass index and health category',          color: '#06b6d4',  bg: 'rgba(6,182,212,0.1)' },
  { id: 'aid',       Icon: Zap,            title: 'First Aid Guide',        desc: 'Step-by-step AI emergency first aid instructions',            color: '#ef4444',  bg: 'rgba(239,68,68,0.1)' },
  { id: 'risk',      Icon: TriangleAlert,  title: 'Health Risk Score',      desc: 'Get your personalized health risk score out of 10',           color: '#f59e0b',  bg: 'rgba(245,158,11,0.1)' },
  { id: 'hospitals', Icon: MapPin,         title: 'Find Hospitals',         desc: 'Locate hospitals and clinics near your location',             color: '#ec4899',  bg: 'rgba(236,72,153,0.1)' },
]

const TIPS = [
  'Drink at least 8 glasses of water every day to stay hydrated',
  'Aim for 7–9 hours of quality sleep each night',
  'Do at least 30 minutes of moderate exercise daily',
  'Eat a balanced diet rich in fruits, vegetables, and whole grains',
  'Manage stress through mindfulness, breathing exercises, or short breaks',
  'Schedule regular health check-ups even when you feel well',
]

const QUICK_STATS = [
  { label: 'AI-Powered',   value: 'Groq', icon: Activity, color: '#4f8ef7' },
  { label: 'Available',    value: '24/7',   icon: Clock,    color: '#22c55e' },
  { label: 'Data Privacy', value: 'Secure', icon: Shield,   color: '#a855f7' },
  { label: 'Tools',        value: '8+',     icon: Heart,    color: '#f97316' },
]

export default function HomePage({ setPage }) {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden text-white p-8" style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #1e40af 100%)',
      }}>
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4f8ef7, transparent)', transform: 'translate(-30%, 40%)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 bg-white/10 border border-white/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Healthcare · Groq AI
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-3">
            Your Personal<br />Health Intelligence
          </h1>
          <p className="text-sm sm:text-base opacity-80 mb-6 leading-relaxed">
            Get AI-powered health insights, symptom analysis, and clinical reports — available anytime, anywhere.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage('chat')} className="flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition active:scale-95 shadow-lg">
              <MessageCircle size={15} /> Chat with AI
            </button>
            <button onClick={() => setPage('symptom')} className="flex items-center gap-2 border border-white/30 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition active:scale-95 backdrop-blur-sm">
              <AlertCircle size={15} /> Check Symptoms
            </button>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}25` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{value}</div>
                <div className="text-[10px] text-white/60">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">All Features</h2>
          <span className="text-xs text-slate-400">8 tools available</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FEATURES.map(({ id, Icon, title, desc, color, bg }) => (
            <div
              key={id}
              onClick={() => setPage(id)}
              className="card p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at top left, ${color}08, transparent 70%)` }} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">{title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{desc}</div>
                <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                  Open <ArrowRight size={11} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Tips */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Heart size={14} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Daily Health Tips</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <span className="mt-0.5 text-green-500 font-bold flex-shrink-0 text-base">✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div
          onClick={() => setPage('report')}
          className="card p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4"
          style={{ borderLeft: '3px solid #4f8ef7' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,142,247,0.1)' }}>
            <FileText size={22} color="#4f8ef7" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Generate Health Report</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Professional PDF clinical report in seconds</div>
          </div>
          <ArrowRight size={16} className="text-slate-400 ml-auto flex-shrink-0" />
        </div>
        <div
          onClick={() => setPage('risk')}
          className="card p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-4"
          style={{ borderLeft: '3px solid #f59e0b' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <TriangleAlert size={22} color="#f59e0b" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Check Your Risk Score</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Personalized health risk assessment out of 10</div>
          </div>
          <ArrowRight size={16} className="text-slate-400 ml-auto flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
