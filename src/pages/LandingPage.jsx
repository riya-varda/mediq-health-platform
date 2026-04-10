import { useEffect, useState, useRef } from 'react'
import {
  Activity, Brain, FileText, MessageCircle,
  Shield, Zap, ChevronRight, Heart, Microscope,
  Clock, ArrowRight, Stethoscope, Bot
} from 'lucide-react'

const ROTATING_TEXTS = [
  'AI Powered Healthcare',
  'Smart Symptom Detection',
  'Instant Medical Reports',
  'Personalized Health Insights',
  'Real-Time Risk Analysis',
]

const STATS = [
  { value: '98%', label: 'Accuracy Rate', icon: '🎯' },
  { value: '< 2s', label: 'Response Time', icon: '⚡' },
  { value: '24/7', label: 'Always Available', icon: '🌐' },
  { value: 'Free', label: 'No Sign-Up', icon: '✅' },
]

const FEATURES = [
  { icon: MessageCircle, title: 'AI Health Assistant', desc: 'Chat with our Llama-powered AI for instant answers to any health question.', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  { icon: Activity, title: 'Symptom Checker', desc: 'Describe your symptoms and receive a structured clinical assessment in seconds.', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { icon: FileText, title: 'Health Reports', desc: 'Generate professional PDF health reports with diagnosis insights and action plans.', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  { icon: Brain, title: 'Risk Analysis', desc: 'Get your personalized health risk score based on lifestyle and medical history.', color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  { icon: Zap, title: 'First Aid Guide', desc: 'Emergency step-by-step AI guidance for any first aid situation.', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  { icon: Microscope, title: 'Prescription Explainer', desc: 'Understand your prescriptions and medications in plain, clear language.', color: '#2563eb', bg: 'rgba(37,99,235,0.12)' },
]

const MARQUEE_ITEMS = [
  '🩺 AI Symptom Checker', '💊 Prescription Explainer', '📋 Health Reports', '🧬 Risk Analysis',
  '🏥 Find Hospitals', '⚡ First Aid Guide', '📊 BMI Calculator', '🤖 Llama 3.3 Powered',
  '🔒 Privacy First', '🌿 Health Intelligence', '💙 Free to Use', '🩺 AI Symptom Checker',
  '💊 Prescription Explainer', '📋 Health Reports', '🧬 Risk Analysis', '🏥 Find Hospitals',
]

export default function LandingPage({ onEnter }) {
  const [textIndex, setTextIndex] = useState(0)
  const [fadeState, setFadeState] = useState('in')
  const [chatOpen, setChatOpen] = useState(false)
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out')
      setTimeout(() => {
        setTextIndex((i) => (i + 1) % ROTATING_TEXTS.length)
        setFadeState('in')
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Particle / neural network canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const NUM = 60
    const nodes = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      // Draw connections
      for (let i = 0; i < NUM; i++) {
        for (let j = i + 1; j < NUM; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)'
        ctx.fill()
        // Move
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .landing-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 40%, #f0fdf4 70%, #ecfeff 100%);
          color: #1e293b;
          min-height: 100vh;
          overflow-x: hidden;
        }

        canvas.neural-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
        }

        .gradient-wave {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(34,197,94,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(59,130,246,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 60% 10%, rgba(14,165,233,0.07) 0%, transparent 50%);
          animation: waveShift 10s ease-in-out infinite alternate;
        }

        @keyframes waveShift {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.7; transform: scale(1); }
        }

        .content { position: relative; z-index: 1; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 14px 32px;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(34,197,94,0.15);
          box-shadow: 0 1px 20px rgba(34,197,94,0.08);
        }

        .nav-logo {
          font-family: 'Sora', sans-serif; font-weight: 700; font-size: 22px;
          background: linear-gradient(135deg, #059669, #2563eb);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: flex; align-items: center; gap: 10px;
        }

        .nav-logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #059669, #2563eb);
          display: flex; align-items: center; justify-content: center;
        }

        .nav-btn {
          background: linear-gradient(135deg, #059669, #2563eb);
          color: white; border: none; border-radius: 10px;
          padding: 10px 24px; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(34,197,94,0.30);
          transition: all 0.2s;
        }
        .nav-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(34,197,94,0.45); }
        .nav-btn:active { transform: scale(0.97); }

        /* MARQUEE */
        .marquee-wrap {
          overflow: hidden; white-space: nowrap;
          background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.08));
          border-top: 1px solid rgba(34,197,94,0.12);
          border-bottom: 1px solid rgba(59,130,246,0.12);
          padding: 10px 0;
          margin-top: 65px;
        }

        .marquee-inner {
          display: inline-block;
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-item {
          display: inline-block; margin: 0 32px;
          font-size: 13px; font-weight: 600;
          color: #059669;
          letter-spacing: 0.02em;
        }

        .marquee-sep {
          color: #2563eb; margin: 0 8px; font-size: 10px; vertical-align: middle;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* HERO */
        .hero {
          min-height: calc(100vh - 100px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 60px 24px 80px;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 100px; padding: 6px 16px;
          font-size: 12px; font-weight: 600; color: #059669;
          letter-spacing: 0.05em; text-transform: uppercase;
          margin-bottom: 32px;
          animation: fadeSlideDown 0.8s ease forwards;
        }

        .hero-badge-dot {
          width: 6px; height: 6px;
          background: #059669; border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(40px, 7vw, 76px);
          font-weight: 800; line-height: 1.05;
          margin-bottom: 12px;
          animation: fadeSlideDown 0.8s 0.1s ease both;
        }

        .hero-title-static { color: #0f172a; display: block; }

        .hero-title-gradient {
          background: linear-gradient(135deg, #059669 0%, #2563eb 50%, #0ea5e9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: block; background-size: 200% 200%;
          animation: gradientText 5s ease infinite, fadeSlideDown 0.8s 0.15s ease both;
        }

        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .rotating-text-container {
          height: 56px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; overflow: hidden;
        }

        .rotating-text {
          font-family: 'Sora', sans-serif;
          font-size: clamp(16px, 2.5vw, 24px); font-weight: 600;
          transition: opacity 0.4s ease, transform 0.4s ease;
          color: #475569; text-align: center;
        }
        .rotating-text.in { opacity: 1; transform: translateY(0); }
        .rotating-text.out { opacity: 0; transform: translateY(-12px); }

        .hero-desc {
          max-width: 540px; font-size: 16px; color: #64748b;
          line-height: 1.7; margin-bottom: 44px;
          animation: fadeSlideDown 0.8s 0.3s ease both;
        }

        .hero-buttons {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          animation: fadeSlideDown 0.8s 0.4s ease both;
        }

        .btn-primary-hero {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #059669, #2563eb);
          color: white; border: none; border-radius: 14px;
          padding: 15px 34px; font-size: 15px; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          box-shadow: 0 8px 25px rgba(34,197,94,0.30), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.25s;
        }
        .btn-primary-hero:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(34,197,94,0.45); }
        .btn-primary-hero:active { transform: scale(0.97); }

        .btn-secondary-hero {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.85);
          color: #0f172a; border: 1px solid rgba(34,197,94,0.25);
          border-radius: 14px; padding: 15px 34px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          font-family: 'Inter', sans-serif; transition: all 0.25s;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }
        .btn-secondary-hero:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(37,99,235,0.3);
          transform: translateY(-2px);
        }

        /* STATS / HEALTH GAUGE CARD */
        .hero-visual {
          margin-top: 70px; position: relative;
          width: 100%; max-width: 900px;
          animation: fadeSlideDown 1s 0.5s ease both;
        }

        .glass-card {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 24px; padding: 32px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(34,197,94,0.08), 0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .metric-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(34,197,94,0.12);
          border-radius: 16px; padding: 20px;
          text-align: center; transition: transform 0.2s;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
        }
        .metric-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(34,197,94,0.12); }

        .metric-icon { font-size: 28px; margin-bottom: 8px; }
        .metric-value {
          font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 800;
          background: linear-gradient(135deg, #059669, #2563eb);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .metric-label { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 500; }

        /* PULSE RINGS */
        .pulse-ring-container {
          position: relative; width: 110px; height: 110px;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 36px;
        }

        .pulse-ring {
          position: absolute; width: 100%; height: 100%; border-radius: 50%;
          border: 2px solid rgba(34,197,94,0.25);
          animation: pulse-ring-anim 2.2s ease-out infinite;
        }
        .pulse-ring:nth-child(2) { animation-delay: 0.7s; }
        .pulse-ring:nth-child(3) { animation-delay: 1.4s; }

        @keyframes pulse-ring-anim {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .pulse-center {
          width: 74px; height: 74px;
          background: linear-gradient(135deg, #059669, #2563eb);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          box-shadow: 0 8px 25px rgba(34,197,94,0.35);
        }

        /* ORBS */
        .orb { position: fixed; border-radius: 50%; filter: blur(70px); pointer-events: none; animation: float 7s ease-in-out infinite; }
        .orb-1 { width: 320px; height: 320px; background: rgba(34,197,94,0.10); top: 10%; left: -120px; animation-delay: 0s; }
        .orb-2 { width: 280px; height: 280px; background: rgba(59,130,246,0.10); top: 50%; right: -80px; animation-delay: 2.5s; }
        .orb-3 { width: 220px; height: 220px; background: rgba(14,165,233,0.08); bottom: 20%; left: 25%; animation-delay: 5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-24px); }
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* SECTION */
        .section { padding: 90px 24px; max-width: 1100px; margin: 0 auto; }

        .section-label {
          text-align: center; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #059669; margin-bottom: 14px;
        }

        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(26px, 4vw, 42px); font-weight: 700;
          text-align: center; color: #0f172a; margin-bottom: 14px; line-height: 1.2;
        }

        .section-sub {
          text-align: center; color: #64748b; font-size: 15px;
          max-width: 480px; margin: 0 auto 56px; line-height: 1.7;
        }

        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }

        /* GLASSMORPHISM FEATURE CARDS */
        .feature-card {
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(34,197,94,0.12);
          border-radius: 20px; padding: 26px;
          transition: all 0.3s; position: relative; overflow: hidden; cursor: default;
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .feature-card:hover {
          border-color: rgba(34,197,94,0.30); transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .feature-icon {
          width: 50px; height: 50px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }

        .feature-title { font-family: 'Sora', sans-serif; font-size: 17px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
        .feature-desc { font-size: 13px; color: #64748b; line-height: 1.7; }

        /* HEALTH SCORE GAUGE */
        .gauge-section { padding: 80px 24px; }
        .gauge-glass {
          max-width: 480px; margin: 0 auto;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 28px; padding: 40px;
          backdrop-filter: blur(24px);
          box-shadow: 0 20px 60px rgba(34,197,94,0.10), inset 0 1px 0 rgba(255,255,255,0.9);
          text-align: center;
        }
        .gauge-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
        .gauge-sub { font-size: 13px; color: #64748b; margin-bottom: 28px; }

        /* AI VISUAL */
        .ai-visual {
          background: rgba(255,255,255,0.55); border: 1px solid rgba(34,197,94,0.12); border-radius: 28px;
          padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
          backdrop-filter: blur(20px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        @media (max-width: 768px) {
          .ai-visual { grid-template-columns: 1fr; gap: 40px; padding: 28px; }
          .nav { padding: 14px 20px; }
          .hero { padding: 80px 20px 60px; }
          .hero-card { grid-template-columns: repeat(2, 1fr); }
        }

        .ai-visual-text h2 { font-family: 'Sora', sans-serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 16px; }
        .ai-visual-text p { color: #64748b; font-size: 14px; line-height: 1.75; margin-bottom: 28px; }

        .ai-features-list { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 10px; }
        .ai-features-list li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #475569; }
        .ai-check {
          width: 20px; height: 20px; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3);
          border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; color: #059669;
        }

        /* CHAT MOCKUP */
        .chat-mockup {
          background: rgba(255,255,255,0.75); border: 1px solid rgba(34,197,94,0.15);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(34,197,94,0.10);
          backdrop-filter: blur(12px);
        }

        .chat-topbar {
          background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.08));
          border-bottom: 1px solid rgba(34,197,94,0.12); padding: 14px 18px;
          display: flex; align-items: center; gap: 10px;
        }

        .chat-avatar {
          width: 30px; height: 30px; background: linear-gradient(135deg, #059669, #2563eb);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 12px; color: white;
        }

        .chat-name { font-size: 13px; font-weight: 600; color: #0f172a; }
        .chat-online { font-size: 10px; color: #059669; display: flex; align-items: center; gap: 4px; }
        .chat-dot { width: 5px; height: 5px; background: #059669; border-radius: 50%; animation: blink 1.5s ease-in-out infinite; }

        .chat-body { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
        .chat-msg-ai { background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.12); border-radius: 12px 12px 12px 4px; padding: 11px 14px; font-size: 12px; color: #334155; max-width: 85%; line-height: 1.6; }
        .chat-msg-user { background: linear-gradient(135deg, #059669, #2563eb); border-radius: 12px 12px 4px 12px; padding: 11px 14px; font-size: 12px; color: white; max-width: 75%; align-self: flex-end; line-height: 1.6; }

        .chat-typing { display: flex; gap: 4px; padding: 9px 12px; background: rgba(34,197,94,0.06); border-radius: 10px 10px 10px 4px; width: fit-content; }
        .typing-dot { width: 5px; height: 5px; background: #059669; border-radius: 50%; animation: dot-bounce 1.2s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dot-bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

        /* CTA */
        .cta-section { max-width: 1100px; margin: 0 auto; padding: 0 24px 90px; }
        .cta-card {
          background: linear-gradient(135deg, rgba(34,197,94,0.10), rgba(59,130,246,0.08));
          border: 1px solid rgba(34,197,94,0.20); border-radius: 28px; padding: 60px;
          text-align: center; position: relative; overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(34,197,94,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .cta-card::before {
          content: ''; position: absolute; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%);
          top: -100px; right: -100px; border-radius: 50%;
        }
        .cta-title { font-family: 'Sora', sans-serif; font-size: clamp(24px, 3.5vw, 40px); font-weight: 700; color: #0f172a; margin-bottom: 14px; position: relative; }
        .cta-desc { color: #64748b; font-size: 15px; max-width: 420px; margin: 0 auto 36px; line-height: 1.7; position: relative; }

        .footer {
          border-top: 1px solid rgba(34,197,94,0.10); padding: 28px;
          text-align: center; font-size: 12px; color: #94a3b8;
          background: rgba(255,255,255,0.5); backdrop-filter: blur(10px);
        }

        .groq-badge {
          background: linear-gradient(135deg, #f97316, #dc2626);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;
        }

        /* FLOATING CHATBOT BUTTON */
        .float-chat-btn {
          position: fixed; bottom: 32px; right: 32px; z-index: 200;
          width: 62px; height: 62px; border-radius: 50%;
          background: linear-gradient(135deg, #059669, #2563eb);
          border: none; cursor: pointer;
          box-shadow: 0 8px 30px rgba(34,197,94,0.40);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; animation: floatBtn 3s ease-in-out infinite;
        }
        .float-chat-btn:hover { transform: scale(1.1) translateY(-3px); box-shadow: 0 14px 40px rgba(34,197,94,0.55); }

        @keyframes floatBtn {
          0%, 100% { box-shadow: 0 8px 30px rgba(34,197,94,0.40); }
          50% { box-shadow: 0 8px 40px rgba(59,130,246,0.40); }
        }

        .float-chat-tooltip {
          position: fixed; bottom: 106px; right: 28px; z-index: 200;
          background: rgba(15,23,42,0.9); color: white; font-size: 12px; font-weight: 500;
          padding: 8px 14px; border-radius: 10px; white-space: nowrap;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          pointer-events: none;
          opacity: 0; transform: translateY(4px);
          transition: all 0.2s;
        }
        .float-chat-btn:hover + .float-chat-tooltip,
        .float-chat-btn:focus + .float-chat-tooltip {
          opacity: 1; transform: translateY(0);
        }

        .hero-card {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;
        }
      `}</style>

      {/* Animated backgrounds */}
      <canvas className="neural-bg" ref={canvasRef} />
      <div className="gradient-wave" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-icon"><Heart size={18} color="white" /></div>
          MediQ
        </div>
        <button className="nav-btn" onClick={onEnter}>Open Platform →</button>
      </nav>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="content">
        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Powered by Groq · Llama 3.3 70B
          </div>

          <div className="pulse-ring-container">
            <div className="pulse-ring" />
            <div className="pulse-ring" />
            <div className="pulse-ring" />
            <div className="pulse-center"><Stethoscope size={30} color="white" /></div>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-static">Healthcare, Reimagined</span>
            <span className="hero-title-gradient">with Artificial Intelligence</span>
          </h1>

          <div className="rotating-text-container">
            <div className={`rotating-text ${fadeState}`}>{ROTATING_TEXTS[textIndex]}</div>
          </div>

          <p className="hero-desc">
            MediQ is your intelligent health companion — combining AI symptom analysis,
            real-time risk assessment, and medical reports into one seamless platform.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary-hero" onClick={onEnter}>
              <Activity size={17} /> Get Started Free
            </button>
            <button className="btn-secondary-hero" onClick={onEnter}>
              Explore Features <ChevronRight size={15} />
            </button>
          </div>

          {/* Stats */}
          <div className="hero-visual">
            <div className="glass-card">
              <div className="hero-card">
                {STATS.map((s) => (
                  <div key={s.label} className="metric-card">
                    <div className="metric-icon">{s.icon}</div>
                    <div className="metric-value">{s.value}</div>
                    <div className="metric-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Animated Health Score Gauge */}
        <div className="gauge-section">
          <div className="gauge-glass">
            <div className="gauge-title">🩺 Live Health Score Demo</div>
            <div className="gauge-sub">See how MediQ evaluates your wellbeing in real time</div>
            <HealthGauge />
          </div>
        </div>

        {/* Features */}
        <section className="section">
          <div className="section-label">Capabilities</div>
          <h2 className="section-title">Everything You Need for<br />Better Health Decisions</h2>
          <p className="section-sub">From symptom checking to professional reports — MediQ covers every aspect of your health journey.</p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Chat Showcase */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="ai-visual">
            <div className="ai-visual-text">
              <div className="section-label" style={{ textAlign: 'left' }}>AI Assistant</div>
              <h2>Talk to MediQ Like a Real Doctor</h2>
              <p>Our Llama-powered AI understands medical context, speaks in plain language, and provides structured health guidance instantly.</p>
              <ul className="ai-features-list">
                {['Understands complex medical terminology', 'Provides structured, actionable guidance', 'Remembers context across the conversation', 'Always reminds you to consult professionals', 'Available 24/7, zero wait time'].map((item) => (
                  <li key={item}><span className="ai-check">✓</span>{item}</li>
                ))}
              </ul>
              <button className="btn-primary-hero" onClick={onEnter} style={{ fontSize: 14, padding: '12px 24px' }}>
                Try AI Chat <ArrowRight size={15} />
              </button>
            </div>

            <div className="chat-mockup">
              <div className="chat-topbar">
                <div className="chat-avatar">M</div>
                <div>
                  <div className="chat-name">MediQ AI</div>
                  <div className="chat-online"><div className="chat-dot" /> Online</div>
                </div>
              </div>
              <div className="chat-body">
                <div className="chat-msg-ai">Hello! I'm MediQ AI 👋 I can help you understand symptoms, medications, and health conditions. How can I assist you today?</div>
                <div className="chat-msg-user">I've had a headache for 3 days with mild fever</div>
                <div className="chat-msg-ai">
                  I understand — that sounds uncomfortable. Based on your symptoms:<br /><br />
                  • <strong>Likely causes:</strong> Viral infection or tension headache<br />
                  • <strong>Severity:</strong> Mild to moderate<br />
                  • <strong>Suggested actions:</strong> Rest, hydration, and paracetamol if needed
                </div>
                <div className="chat-typing">
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-card">
            <Shield size={44} color="#059669" style={{ margin: '0 auto 20px', display: 'block' }} />
            <div className="cta-title">Your Health Intelligence Platform<br />Awaits</div>
            <p className="cta-desc">MediQ gives you smart, AI-driven health guidance — free, private, and available anytime. Get started in seconds.</p>
            <button className="btn-primary-hero" onClick={onEnter} style={{ fontSize: 15 }}>
              <Activity size={17} /> Launch MediQ Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div>© 2025 MediQ Health Platform · For informational purposes only · Not a substitute for professional medical advice</div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
            Powered by <span className="groq-badge">Groq</span> · Llama 3.3 70B
          </div>
        </footer>
      </div>

      {/* Floating AI Chat Button */}
      <button className="float-chat-btn" onClick={onEnter} title="Open AI Chat">
        <Bot size={26} color="white" />
      </button>
      <div className="float-chat-tooltip">💬 Chat with MediQ AI</div>
    </div>
  )
}

// Animated Health Score Gauge using pure SVG + animation
function HealthGauge() {
  const [score, setScore] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [targetScore] = useState(78)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(true)
      let current = 0
      const step = () => {
        current += 1.2
        if (current >= targetScore) { setScore(targetScore); return }
        setScore(Math.floor(current))
        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const radius = 90
  const circumference = 2 * Math.PI * radius
  const pct = score / 100
  const dashOffset = circumference * (1 - pct * 0.75)
  const color = score < 40 ? '#ef4444' : score < 70 ? '#f59e0b' : '#059669'

  return (
    <div>
      <svg viewBox="0 0 220 160" style={{ width: '100%', maxWidth: 280, margin: '0 auto', display: 'block' }}>
        {/* Track */}
        <circle cx="110" cy="130" r={radius} fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="16"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={circumference * 0.125}
          strokeLinecap="round" transform="rotate(135 110 130)" />
        {/* Fill */}
        <circle cx="110" cy="130" r={radius} fill="none" stroke={color} strokeWidth="16"
          strokeDasharray={`${circumference * 0.75 * pct} ${circumference * (1 - 0.75 * pct)}`}
          strokeDashoffset={circumference * 0.125}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.3s ease, stroke 0.5s ease' }}
          transform="rotate(135 110 130)" />
        {/* Score text */}
        <text x="110" y="118" textAnchor="middle" fontSize="44" fontWeight="800" fill={color}
          fontFamily="'Sora', sans-serif">{score}</text>
        <text x="110" y="138" textAnchor="middle" fontSize="12" fill="#94a3b8">Health Score</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
        {[['0-40', 'At Risk', '#ef4444'], ['41-70', 'Fair', '#f59e0b'], ['71-100', 'Good', '#059669']].map(([range, label, c]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c }}>{range}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 18, textAlign: 'center' }}>
        This is a demo score. Use the Health Risk Score tool for your personalized assessment.
      </p>
    </div>
  )
}
