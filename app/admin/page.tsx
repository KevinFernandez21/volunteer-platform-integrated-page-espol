"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  GraduationCap,
  Heart,
  TrendingUp,
  Calendar,
  ArrowLeft,
  BarChart3,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#154d8c] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-white hover:text-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a ESPOL
            </Link>
            <div className="h-6 w-px bg-white/30" />
            <h1 className="text-xl font-bold">Panel de Administración - Voluntariado ESPOL</h1>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Administrador
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen General</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">8 nuevos esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas Voluntariado</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,890</div>
                  <p className="text-xs text-muted-foreground">Este semestre</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impacto ODS</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Cumplimiento objetivos</p>
                </CardContent>
              </Card>
            </div>

            {/* Actividad reciente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones en la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo registro de empresa</p>
                      <p className="text-xs text-muted-foreground">Fundación Malecón 2000 - Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Proyecto completado</p>
                      <p className="text-xs text-muted-foreground">Limpieza Costera Salinas - Hace 5 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">25 nuevos estudiantes registrados</p>
                      <p className="text-xs text-muted-foreground">Facultad de Ingeniería - Hoy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Solicitud de comunidad pendiente</p>
                      <p className="text-xs text-muted-foreground">Cooperativa La Esperanza - Hace 1 día</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Tipo</CardTitle>
                  <CardDescription>Usuarios registrados en la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Estudiantes ESPOL</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">892</div>
                      <div className="text-xs text-muted-foreground">71.5%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Empresas</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">187</div>
                      <div className="text-xs text-muted-foreground">15.0%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Comunidades</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">168</div>
                      <div className="text-xs text-muted-foreground">13.5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios registrados en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Funcionalidad de gestión de usuarios en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Proyectos</CardTitle>
                <CardDescription>Supervisa y administra los proyectos de voluntariado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Panel de gestión de proyectos en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reportes y Análisis</CardTitle>
                <CardDescription>Genera reportes detallados sobre el impacto del voluntariado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sistema de reportes en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
