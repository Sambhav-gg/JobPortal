
import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users, Star, ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch({ type: 'SET_SEARCHED_QUERY', payload: query })
    navigate("/browse")
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const floatingIcons = [
    { icon: Briefcase, delay: 0, x: 100, y: 150 },
    { icon: TrendingUp, delay: 1, x: -120, y: 200 },
    { icon: Users, delay: 2, x: 150, y: 300 },
    { icon: Star, delay: 0.5, x: -100, y: 100 },
    { icon: MapPin, delay: 1.5, x: 200, y: 100 },
    { icon: Clock, delay: 2.5, x: -150, y: 350 }
  ]

  return (
<div 
  ref={heroRef}
  className="relative min-h-screen bg-gradient-to-br from-slate-800 via-blue-300 to-slate-800 overflow-hidden"
  style={{
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #0f172a 100%)`
  }}
>
      {/* Animated background elements */}
      <div className="absolute inset-0">
  <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
</div>

{/* Floating icons */}
{floatingIcons.map((item, index) => {
  const IconComponent = item.icon
  return (
    <div
      key={index}
      className="absolute opacity-10 text-white animate-bounce"
      style={{
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        animationDelay: `${item.delay}s`,
        animationDuration: '3s'
      }}
    >
      <IconComponent className="w-8 h-8" />
    </div>
  )
})}


      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1H40V0H0V1ZM0 41H40V40H0V41ZM1 0h1v40h-1V0ZM39 0h1V40h-1V0Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 group"></div>

        {/* Main heading */}
        <div className="mb-8 space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
          <span className="inline-block animate-fade-in-up">Search,</span>{' '}
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>& </span>
          <br />
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>Get Your</span>
          <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up animate-pulse" style={{ animationDelay: '0.8s' }}>
            DREAM JOB
          </span>
  </h1>
</div>


        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '1s' }}>
          Discover thousands of opportunities tailored to your skills and ambitions. 
          Your perfect career awaits in our comprehensive job marketplace.
        </p>

        {/* Search container */}
<div className="w-full max-w-2xl mb-12 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
  <div className={`relative group transition-all duration-500 ${isSearchFocused ? 'scale-105' : ''}`}>
    {/* Glowing border effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
    
    <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 transition-all duration-300 hover:bg-white/20">
      <input
        type="text"
        placeholder="Find your dream job..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 text-lg outline-none"
      />
      <Button 
        onClick={searchJobHandler}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline">Search</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
</div>


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-300">Active Jobs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-white mb-2">25K+</div>
            <div className="text-gray-300">Companies</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-white mb-2">100K+</div>
            <div className="text-gray-300">Success Stories</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default HeroSection