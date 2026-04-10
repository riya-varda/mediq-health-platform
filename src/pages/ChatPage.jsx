import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { askGemini } from '../api'
import { LoadingDots, Disclaimer, ErrorBanner } from '../components/UI'

const QUICK_ACTIONS = [
  'Help me check my symptoms',
  'What is diabetes and how to manage it?',
  'Give me first aid tips for burns',
  'What are common cold remedies?',
  'How to calculate my BMI?',
  'Tips for better sleep',
]

const INITIAL_MSG = {
  role: 'assistant',
  text: "Hello! I'm MediQ AI, your personal health assistant 👋\n\nI can help you with:\n• Symptom analysis and guidance\n• Medicine and prescription information\n• First aid instructions\n• General health advice\n• Disease explanations\n\nHow can I help you today?",
}

function MessageBubble({ m }) {
  const isUser = m.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
          M
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'text-white rounded-tr-sm'
            : 'bg-slate-100 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-slate-700/50'
        }`}
        style={isUser ? { background: 'linear-gradient(135deg, #4f8ef7, #6366f1)' } : {}}
      >
        {m.text}
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const query = text || input.trim()
    if (!query || loading) return
    setInput('')
    setError('')
    setMessages((m) => [...m, { role: 'user', text: query }])
    setLoading(true)

    try {
      const history = messages
        .filter((m) => m !== INITIAL_MSG)
        .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }))
      history.push({ role: 'user', content: query })

      const reply = await askGemini(history)
      setMessages((m) => [...m, { role: 'assistant', text: reply }])
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px - 48px)' }}>
      {/* Quick actions */}
      <div className="card p-3 mb-3 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <Sparkles size={12} className="text-brand-400" />
          Quick Actions
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} className="btn-ghost text-xs py-1.5">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="card flex-1 flex flex-col overflow-hidden p-4">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.map((m, i) => (
            <MessageBubble key={i} m={m} />
          ))}

          {loading && (
            <div className="flex items-start justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2 text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
                M
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <ErrorBanner message={error} />

        <div className="mt-3 flex gap-2 flex-shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask a health question..."
            className="input-base flex-1"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="btn-primary px-4"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
      <Disclaimer />
    </div>
  )
}
