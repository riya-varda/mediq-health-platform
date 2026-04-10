import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import Sidebar, { NAV } from './components/Sidebar'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import SymptomPage from './pages/SymptomPage'
import ReportPage from './pages/ReportPage'
import RxPage from './pages/RxPage'
import BMIPage from './pages/BMIPage'
import AidPage from './pages/AidPage'
import RiskPage from './pages/RiskPage'
import HospitalsPage from './pages/HospitalsPage'

const PAGES = {
  home:      HomePage,
  chat:      ChatPage,
  symptom:   SymptomPage,
  report:    ReportPage,
  rx:        RxPage,
  bmi:       BMIPage,
  aid:       AidPage,
  risk:      RiskPage,
  hospitals: HospitalsPage,
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [page, setPage] = useState('home')
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('mediq-dark')
    if (saved !== null) return saved === 'true'
    return true
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('mediq-dark', dark)
  }, [dark])

  const navigate = (id) => {
    setPage(id)
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  const enterPlatform = () => {
    setShowLanding(false)
    document.body.style.overflow = ''
  }

  if (showLanding) {
    return <LandingPage onEnter={enterPlatform} />
  }

  const PageComponent = PAGES[page] || HomePage
  const pageTitle = NAV.find((n) => n.id === page)?.label || 'Home'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0a0f1e]">
      <Sidebar
        page={page}
        setPage={navigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={pageTitle}
          dark={dark}
          toggleDark={() => setDark((d) => !d)}
          toggleSidebar={() => setSidebarOpen((s) => !s)}
          onLanding={() => setShowLanding(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <PageComponent setPage={navigate} />
          </div>
        </main>
      </div>
    </div>
  )
}
