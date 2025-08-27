"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Building2, GraduationCap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VoluntariadoPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  const videos = [
    "/videos/Video_Listo_Tras_Instrucción.mp4",
    "/videos/Video_de_Grupo_de_Gente.mp4", 
    "/videos/Video_de_reparto_de_ropa.mp4"
  ]

  const handleLearnMore = (section: string) => {
    console.log(`[v0] Learning more about: ${section}`)
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }


  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextVideo()
    }
    if (isRightSwipe) {
      // Para swipe derecha, ir al video anterior
      setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
    }
  }

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextVideo()
    }, 5000) // Cambia video cada 6 segundos

    return () => clearInterval(interval)
  }, [videos.length, isPaused])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by ESPOL design */}
      <section 
        className="relative bg-[#2B4C8C] text-white py-20 px-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Video Carousel Container */}
          <div 
            className="flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
          >
            {videos.map((video, index) => (
              <div key={video} className="relative min-w-full h-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B4C8C]/85 via-[#2B4C8C]/70 to-[#2B4C8C]/85" />
          
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>
            SE PARTE DEL CAMBIO
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow-xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            VOLUNTARIADOS
          </h2>
          <p className="text-xl mb-8 leading-relaxed text-white max-w-3xl mx-auto drop-shadow-xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Conectando empresas, comunidades y estudiantes de ESPOL para generar impacto social sostenible alineado con
            los ODS
          </p>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/30 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 drop-shadow-lg text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              ¿Quieres ser parte del voluntariado?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=estudiante">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#2B4C8C] hover:bg-gray-100 shadow-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Inscríbete
                </Button>
              </Link>
              <Link href="/register?type=comunidad">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm shadow-lg"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Postula tu comunidad
                </Button>
              </Link>
              <Link href="/register?type=empresa">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm shadow-lg"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Empresas
                </Button>
              </Link>
            </div>
          </div>

          
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#2B4C8C] mb-12">Componentes de la Plataforma</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("geolocation")}
            >
              <CardHeader>
                <MapPin className="w-10 h-10 text-[#2B4C8C] mb-2" />
                <CardTitle className="text-gray-900">Necesidades Geolocalizadas</CardTitle>
                <CardDescription>Registro preciso de necesidades comunitarias con ubicación geográfica</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Identifica y prioriza intervenciones según urgencia y relevancia, optimizando recursos y evitando
                  duplicidad de esfuerzos.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("corporate")}
            >
              <CardHeader>
                <Building2 className="w-10 h-10 text-[#FF6B35] mb-2" />
                <CardTitle className="text-gray-900">Panel Empresarial</CardTitle>
                <CardDescription>Gestión centralizada de voluntariado corporativo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Planifica, asigna y monitorea actividades de RSE alineadas con objetivos estratégicos empresariales.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("university")}
            >
              <CardHeader>
                <GraduationCap className="w-10 h-10 text-[#2B4C8C] mb-2" />
                <CardTitle className="text-gray-900">Panel Universitario</CardTitle>
                <CardDescription>Coordinación académica del voluntariado estudiantil</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Integra formación académica con acción social, convirtiendo el voluntariado en aprendizaje práctico.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("ods")}
            >
              <CardHeader>
                <Target className="w-10 h-10 text-[#FF6B35] mb-2" />
                <CardTitle className="text-gray-900">Indicadores ODS</CardTitle>
                <CardDescription>Métricas de impacto en tiempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Mide el aporte de cada acción al cumplimiento de los Objetivos de Desarrollo Sostenible.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("tracking")}
            >
              <CardHeader>
                <Users className="w-10 h-10 text-[#2B4C8C] mb-2" />
                <CardTitle className="text-gray-900">Seguimiento Integral</CardTitle>
                <CardDescription>Monitoreo de todos los actores involucrados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Comunicación fluida entre empresas, universidades, voluntarios y organizaciones sociales.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-[#FF6B35]/20"
              onClick={() => handleLearnMore("results")}
            >
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-[#FF6B35] mb-2" />
                <CardTitle className="text-gray-900">Módulo de Resultados</CardTitle>
                <CardDescription>Visualización de impactos y logros</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Centraliza resultados de manera visual y comprensible, generando confianza y evidenciando
                  contribuciones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#2B4C8C] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">¿Listo para generar impacto social?</h3>
          <p className="text-xl text-white/80 mb-8">Conecta, colabora y transforma vidas a través del voluntariado</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white">
                Comenzar Ahora
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
