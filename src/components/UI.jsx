import { AlertTriangle, Info } from 'lucide-react'

export function LoadingDots() {
  return (
    <div className="flex gap-1 items-center py-0.5">
      <div className="dot-1 w-1.5 h-1.5 rounded-full bg-brand-400" />
      <div className="dot-2 w-1.5 h-1.5 rounded-full bg-brand-400" />
      <div className="dot-3 w-1.5 h-1.5 rounded-full bg-brand-400" />
    </div>
  )
}

export function Disclaimer() {
  return (
    <div className="disclaimer flex items-start gap-2 mt-4">
      <Info size={13} className="flex-shrink-0 mt-0.5" />
      <span>
        <strong>Medical Disclaimer:</strong> This information is AI-generated and for educational purposes only. 
        It does not replace professional medical advice, diagnosis, or treatment. 
        Always consult a qualified healthcare provider for medical concerns.
      </span>
    </div>
  )
}

export function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-lg text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  )
}

export function EmergencyBanner() {
  return (
    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-lg text-sm text-red-700 dark:text-red-300 flex items-start gap-2 font-medium">
      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
      <span>In a life-threatening emergency, call <strong>112</strong> (India) or your local emergency number immediately. Do not rely solely on this guide.</span>
    </div>
  )
}

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  )
}

export function ResultBox({ title, content, children }) {
  return (
    <div className="card p-5 mt-5 fade-in">
      <div className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
        {title}
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700/50 pt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
      {children}
    </div>
  )
}
