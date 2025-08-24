import type React from "react"
import Link from "next/link"
import { Users, Target, Zap, BarChart3, User, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VoluntariadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ESPOL Header */}
      <div className="bg-[#2B4C8C] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-blue-200 hover:text-white transition-colors flex items-center">
              ← Volver a ESPOL
            </Link>
            <div className="text-right">
              <h2 className="text-xl font-bold">Voluntariado ESPOL</h2>
              <p className="text-sm text-blue-200">Plataforma de Voluntariado Colaborativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <nav className="flex space-x-8">
              <Link
                href="/voluntariado/proyectos"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#2B4C8C] transition-colors"
              >
                <Target className="w-4 h-4" />
                <span>Proyectos</span>
              </Link>
              <Link
                href="/voluntariado/oportunidades"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#2B4C8C] transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Oportunidades</span>
              </Link>
              <Link
                href="/voluntariado/matching"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#2B4C8C] transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>Matching</span>
              </Link>
              <Link
                href="/voluntariado/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#2B4C8C] transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/voluntariado/perfil"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#2B4C8C] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
              <Button size="sm" className="bg-[#2B4C8C] hover:bg-[#1e3a6f]">
                <UserPlus className="w-4 h-4 mr-2" />
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  )
}
