"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Users, Building2, Search, Filter, Plus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const mockProjects = [
  {
    id: 1,
    title: "Limpieza de Playas en Salinas",
    description: "Proyecto de limpieza y conservación marina en colaboración con la comunidad pesquera local",
    organization: "Fundación Océanos Limpios",
    location: "Salinas, Santa Elena",
    date: "15 de Marzo, 2024",
    volunteers: 25,
    maxVolunteers: 50,
    ods: ["ODS 14", "ODS 15"],
    status: "Activo",
    type: "Ambiental",
    image: "/beach-cleanup-volunteers.png",
  },
  {
    id: 2,
    title: "Educación Digital para Adultos Mayores",
    description: "Capacitación en tecnologías digitales básicas para adultos mayores de la comunidad",
    organization: "Centro Comunitario El Guasmo",
    location: "Guayaquil, Guayas",
    date: "22 de Marzo, 2024",
    volunteers: 12,
    maxVolunteers: 20,
    ods: ["ODS 4", "ODS 10"],
    status: "Activo",
    type: "Educativo",
    image: "/elderly-computer-learning.png",
  },
  {
    id: 3,
    title: "Huerto Urbano Comunitario",
    description: "Implementación de huertos urbanos sostenibles en espacios comunitarios",
    organization: "Cooperativa Agrícola Verde",
    location: "Durán, Guayas",
    date: "5 de Abril, 2024",
    volunteers: 8,
    maxVolunteers: 15,
    ods: ["ODS 2", "ODS 11"],
    status: "Planificación",
    type: "Ambiental",
    image: "/urban-garden-volunteers.png",
  },
]

export default function ProyectosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || project.type === filterType
    const matchesStatus = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div>
      <PageHeader
        title="Proyectos de Voluntariado"
        description="Descubre y participa en proyectos que generan impacto social positivo"
      >
        <Link href="/voluntariado/proyectos/crear">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Crear Proyecto
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Ambiental">Ambiental</SelectItem>
                  <SelectItem value="Educativo">Educativo</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Planificación">Planificación</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={project.status === "Activo" ? "default" : "secondary"}>{project.status}</Badge>
                  <Badge variant="outline" className="bg-white/90">
                    {project.type}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    {project.organization}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {project.volunteers}/{project.maxVolunteers} voluntarios
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.ods.map((ods) => (
                      <Badge key={ods} variant="secondary" className="text-xs">
                        {ods}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href={`/voluntariado/proyectos/${project.id}`}>
                      <Button className="w-full">Ver Detalles</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron proyectos que coincidan con los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
