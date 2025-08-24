"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EspolHomePage() {
  const handleDisabledClick = (section: string) => {
    alert(`La sección "${section}" no está disponible en este prototipo. Solo "Voluntariado" es funcional.`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ESPOL Header - Exact replica */}
      <header className="bg-[#2B4C8C] text-white">
        {/* Top bar with social links */}
        <div className="bg-[#1e3a6f] px-4 py-2">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDisabledClick("Contáctanos")}
                className="bg-[#2B4C8C] px-3 py-1 rounded text-white hover:bg-[#1e3a6f] transition-colors"
              >
                Contáctanos
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌐 en</span>
              <span>es</span>
              <div className="flex space-x-2 ml-4">
                <span>f</span>
                <span>📷</span>
                <span>🐦</span>
                <span>📺</span>
                <span>💼</span>
                <span>🎵</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* ESPOL Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-white">espol</span>
                <div className="text-xs text-gray-300">Escuela Superior Politécnica del Litoral</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => handleDisabledClick("La ESPOL")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                La ESPOL <span className="ml-1">▼</span>
              </button>
              <button
                onClick={() => handleDisabledClick("Educación")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                Educación <span className="ml-1">▼</span>
              </button>
              <button
                onClick={() => handleDisabledClick("Vida politécnica")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                Vida politécnica <span className="ml-1">▼</span>
              </button>
              <button
                onClick={() => handleDisabledClick("Investigación")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                Investigación <span className="ml-1">▼</span>
              </button>
              <Link
                href="/voluntariado"
                className="text-white hover:text-gray-300 transition-colors flex items-center font-semibold"
              >
                Voluntariado <span className="ml-1">▼</span>
              </Link>
              <button
                onClick={() => handleDisabledClick("Nuestra Huella")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                Nuestra Huella <span className="ml-1">▼</span>
              </button>
              <button
                onClick={() => handleDisabledClick("Transparencia")}
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                Transparencia <span className="ml-1">▼</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - DOCEROS ESPOL Style */}
      <section className="relative bg-gradient-to-r from-gray-100 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-[#2B4C8C] mb-4">
                  PLATAFORMA
                  <br />
                  <span className="text-[#FF6B35]">espol</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Prototipo de integración para la nueva plataforma de voluntariado que conecta empresas, comunidades y
                  estudiantes de ESPOL.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-[#2B4C8C] mb-2">Funcionalidad Disponible</h3>
                  <p className="text-gray-600">
                    En este prototipo, solo la sección <strong>"Voluntariado"</strong> está completamente funcional. Las
                    demás secciones del menú son simuladas para mostrar la integración con el sitio oficial de ESPOL.
                  </p>
                </div>

                <Link href="/voluntariado">
                  <Button size="lg" className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white px-8 py-3 text-lg">
                    Acceder a Voluntariado
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Visual representation */}
            <div className="relative">
              <div className="bg-[#2B4C8C] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Componentes del Prototipo</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span>Registro diferenciado por tipo de usuario</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span>Gestión de proyectos y oportunidades</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span>Dashboard con métricas ODS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span>Sistema de matching inteligente</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span>Comunicación integrada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="bg-[#f8f9fa] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-[#2B4C8C] mb-4">Prototipo de Integración</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Este es un prototipo que demuestra cómo se integraría la nueva plataforma de voluntariado dentro del
              ecosistema web oficial de ESPOL. La navegación y el diseño replican fielmente la identidad visual
              institucional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/voluntariado">
                <Button size="lg" className="bg-[#2B4C8C] hover:bg-[#1e3a6f] text-white">
                  Explorar Plataforma de Voluntariado
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleDisabledClick("Documentación")}
                className="border-[#2B4C8C] text-[#2B4C8C] hover:bg-[#2B4C8C] hover:text-white"
              >
                Ver Documentación
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B4C8C] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg font-semibold mb-2">ESPOL</div>
          <div className="text-sm text-gray-300">Escuela Superior Politécnica del Litoral</div>
          <div className="text-sm text-gray-300 mt-2">Prototipo de Plataforma de Voluntariado</div>
        </div>
      </footer>
    </div>
  )
}
