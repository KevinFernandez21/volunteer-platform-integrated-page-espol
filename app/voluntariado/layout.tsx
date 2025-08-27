"use client"

import type React from "react"
import Link from "next/link"
import { Users, Target, Zap, BarChart3, User, LogIn, UserPlus, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function VoluntariadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ESPOL Header */}
      <div className="bg-[#2B4C8C] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-blue-200 hover:text-white transition-colors flex items-center text-xs sm:text-sm">
              <span className="hidden xs:inline">← Volver a ESPOL</span>
              <span className="xs:hidden">← ESPOL</span>
            </Link>
            <Link href="/voluntariado" className="text-right hover:text-blue-200 transition-colors">
              <h2 className="text-base sm:text-lg md:text-xl font-bold">Voluntariado ESPOL</h2>
              <p className="text-xs md:text-sm text-blue-200 hidden sm:block">Plataforma de Voluntariado Colaborativo</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
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

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Button>
              <Button size="sm" className="bg-[#2B4C8C] hover:bg-[#1e3a6f] text-xs sm:text-sm">
                <UserPlus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Registrarse</span>
              </Button>
            </div>

            {/* Mobile Auth Buttons (visible only on very small screens) */}
            <div className="sm:hidden flex items-center space-x-2">
              <Button variant="outline" size="sm" className="p-2">
                <LogIn className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-[#2B4C8C] hover:bg-[#1e3a6f] p-2">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <nav className="py-4 space-y-2">
                <Link
                  href="/voluntariado/proyectos"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-[#2B4C8C] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Target className="w-5 h-5" />
                  <span>Proyectos</span>
                </Link>
                <Link
                  href="/voluntariado/oportunidades"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-[#2B4C8C] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  <span>Oportunidades</span>
                </Link>
                <Link
                  href="/voluntariado/matching"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-[#2B4C8C] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Zap className="w-5 h-5" />
                  <span>Matching</span>
                </Link>
                <Link
                  href="/voluntariado/dashboard"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-[#2B4C8C] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/voluntariado/perfil"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-[#2B4C8C] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Perfil</span>
                </Link>
                
                {/* Mobile Auth Section */}
                <div className="sm:hidden pt-4 border-t border-gray-200 mt-4">
                  <div className="px-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Iniciar Sesión
                    </Button>
                    <Button className="w-full justify-start bg-[#2B4C8C] hover:bg-[#1e3a6f]">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Registrarse
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  )
}
